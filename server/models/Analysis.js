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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);