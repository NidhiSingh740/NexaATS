const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scores: {
    atsCompatibility: { type: Number, required: true },
    technicalSkills: { type: Number, required: true },
    experienceRelevance: { type: Number, required: true },
    resumeStrength: { type: Number, required: true },
    finalOverall: { type: Number, required: true }
  },
  keywords: {
    matched: [{ type: String }],
    missing: [{ type: String }]
  },
  insights: {
    strengths: [{ type: String }],
    suggestions: [{ type: String }]
  },
  
  fileMeta: {
    filename: { type: String, default: "Processed_Resume_Payload.pdf" },
    fileSize: { type: String, default: "120 KB" }
  }
}, { timestamps: true });

module.exports = mongoose.model('Analysis', AnalysisSchema);