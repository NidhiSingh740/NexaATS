

const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { OpenAI } = require('openai');
const verifyToken = require('../middleware/authMiddleware');

if (!process.env.GROQ_API_KEY) {
  console.error('FATAL: GROQ_API_KEY missing from recruiter environment config.');
  process.exit(1);
}

const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// @route   POST /api/recruiter/batch-rank
// @desc    Accept multi-file resume arrays, parse data via Groq, return sorted leaderboard datasets
router.post('/batch-rank', verifyToken, upload.array('resumes', 20), async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No file arrays detected in post headers.' });
    }
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ success: false, message: 'Missing target job comparison data description context.' });
    }

    // High-level parsing method that maps across each file safely
    const batchProcessingPromises = req.files.map(async (file) => {
      let extractedText = '';
      
      try {
        if (file.mimetype === 'application/pdf') {
          const parseFunction = typeof pdfParse === 'function' ? pdfParse : pdfParse.default;
          const data = await parseFunction(file.buffer);
          extractedText = data.text;
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const result = await mammoth.extractRawText({ buffer: file.buffer });
          extractedText = result.value;
        } else {
          return null; // Skip non-supported files silently
        }
      } catch (parseErr) {
        console.error(`Skipping corrupt profile document: ${file.originalname}`, parseErr);
        return null;
      }

      if (!extractedText || extractedText.trim().length < 50) return null;

      // Prompt optimization forcing strict structured meta profiles out of the text block
      const trackingSystemPrompt = `
        You are a high-speed applicant matching automation engine.
        Analyze the candidate text against the job descriptions requirements.
        
        Extract the applicant's name, email, top skills, and overall compatibility match index.
        You MUST output ONLY a valid, raw JSON object matching this exact shape:
        {
          "name": "Candidate Full Name String",
          "email": "contact@email.com",
          "skills": ["Skill1", "Skill2", "Skill3"],
          "score": [Integer between 0 and 100 representing overall role alignment match]
        }
        
        CRITICAL: Return ONLY raw JSON text. Do not include markdown backticks or explanations.
      `;

      try {
        const response = await ai.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: trackingSystemPrompt },
            { role: "user", content: `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME TEXT:\n${extractedText}` }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1
        });

        const content = response.choices[0].message.content.trim();
        return JSON.parse(content);
      } catch (aiErr) {
        console.error(`LPU failure mapping applicant document: ${file.originalname}`, aiErr);
        return null;
      }
    });

    // Run evaluations concurrently via explicit promise resolution matrices
    const computedResults = await Promise.all(batchProcessingPromises);
    
    // Filter out skipped documents or failed requests and sort rankings by score descending
    const validLeaderboard = computedResults
      .filter(item => item !== null)
      .sort((a, b) => b.score - a.score);

    return res.status(200).json({
      success: true,
      count: validLeaderboard.length,
      data: validLeaderboard
    });

  } catch (error) {
    console.error("Batch routing thread unhandled error:", error);
    return res.status(500).json({ success: false, message: 'Batch ranking operation collapsed: ' + error.message });
  }
});

module.exports = router;