const express = require('express');
const router = express.Router();
const multer = require('multer');
const mammoth = require('mammoth');
const { OpenAI } = require('openai');
const verifyToken = require('../middleware/authMiddleware');
const Analysis = require('../models/Analysis');

// ✅ BULLETPROOF pdf-parse import
const pdfParseLib = require('pdf-parse');
const pdfParse = typeof pdfParseLib === 'function'
  ? pdfParseLib
  : typeof pdfParseLib.default === 'function'
    ? pdfParseLib.default
    : pdfParseLib.pdf
      ? pdfParseLib.pdf
      : null;

if (!pdfParse) {
  console.error('FATAL: Could not resolve pdf-parse function.');
  process.exit(1);
}

if (!process.env.GROQ_API_KEY) {
  console.error('FATAL: GROQ_API_KEY is missing from your .env file.');
  process.exit(1);
}

const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only .PDF and .DOCX files are permitted.'), false);
    }
  }
});

// 🌟 FIX: Register GET /history at the TOP of the routes stack so Express maps it explicitly
// @route   GET /api/analysis/history
// @desc    Fetch all past evaluation logs for the authenticated user
router.get('/history', verifyToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Invalid token context payload.' });
    }

    const logs = await Analysis.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    console.error("Fetch history route error:", error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve scan records: ' + error.message });
  }
});

// @route POST /api/analysis/evaluate
router.post('/evaluate', verifyToken, upload.single('resume'), async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No resume file was uploaded.' });
    }
    if (!jobDescription || jobDescription.trim() === '') {
      return res.status(400).json({ success: false, message: 'No job description text was provided.' });
    }

    let extractedText = '';
    if (req.file.mimetype === 'application/pdf') {
      try {
        const data = await pdfParse(req.file.buffer);
        extractedText = data.text;
      } catch (parseError) {
        console.error('PDF parse error:', parseError);
        return res.status(500).json({
          success: false,
          message: 'Failed to read your PDF: ' + parseError.message
        });
      }
    } else {
      try {
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        extractedText = result.value;
      } catch (docxError) {
        console.error('DOCX parse error:', docxError);
        return res.status(500).json({
          success: false,
          message: 'Failed to read your DOCX file: ' + docxError.message
        });
      }
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract enough text from your resume.'
      });
    }

    const systemPrompt = `
      You are an elite ATS (Applicant Tracking System) engine and senior technical recruiter.
      Evaluate the provided User Resume Text against the Target Job Description.
      You MUST respond with a valid, raw JSON object matching this exact schema:
      {
        "scores": {
          "atsCompatibility": 85,
          "technicalSkills": 78,
          "experienceRelevance": 90,
          "resumeStrength": 82,
          "finalOverall": 84
        },
        "keywords": {
          "matched": ["React", "Node.js", "MongoDB"],
          "missing": ["Docker", "Redis", "AWS"]
        },
        "insights": {
          "strengths": ["Excellent structured outline formatting"],
          "suggestions": ["Incorporate explicit metrics to projects"]
        }
      }
      CRITICAL: Return ONLY raw JSON text. Do not include markdown backticks or explanations.
    `;

    let aiResult = '';
    try {
      const response = await ai.chat.completions.create({
        model: "llama-3.3-70b-versatile", 
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME TEXT:\n${extractedText}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      });

      aiResult = response.choices[0].message.content;
    } catch (groqError) {
      console.error('Groq Engine API error:', groqError);
      return res.status(502).json({
        success: false,
        message: 'Groq AI infrastructure failed: ' + groqError.message
      });
    }

    let cleanJson = aiResult.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```json|```$/g, '').trim();
    }

    const parsedData = JSON.parse(cleanJson);

    const evaluationRecord = await Analysis.create({
      userId: req.user.id,
      scores: parsedData.scores,
      keywords: parsedData.keywords,
      insights: parsedData.insights
    });

    return res.status(200).json({
      success: true,
      message: 'Analysis complete and saved successfully.',
      data: evaluationRecord
    });

  } catch (error) {
    console.error('Unhandled analysis route error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred: ' + error.message
    });
  }
});

module.exports = router;