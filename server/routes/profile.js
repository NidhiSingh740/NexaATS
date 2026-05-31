

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Analysis = require('../models/Analysis');
const User = require('../models/User'); 


router.get('/meta', verifyToken, async (req, res) => {
  try {
  
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User identity matrix not found.' });
    }

    const evaluations = await Analysis.find({ userId: req.user.id }).sort({ createdAt: -1 });

    const mappedResumes = evaluations.map((doc) => ({
      id: doc._id,
      filename: doc.fileMeta?.filename || "Extracted_Talent_Profile.pdf",
      size: doc.fileMeta?.fileSize || "120 KB",
      date: new Date(doc.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      score: doc.scores?.finalOverall || 0
    }));

    
    return res.status(200).json({
      success: true,
      data: {
        identity: {
          name: user.name,
          email: user.email,
          role: user.role || 'candidate'
        },
        savedResumes: mappedResumes,
       
        preferences: user.preferences || {
          aiModel: 'llama-3.3-70b-versatile',
          strictnessMode: 'Balanced',
          emailAlerts: true,
          twoFactor: false
        }
      }
    });
  } catch (error) {
    console.error("Profile fetch module crash:", error);
    return res.status(500).json({ success: false, message: 'Server fell offline processing meta logs: ' + error.message });
  }
});


router.put('/preferences', verifyToken, async (req, res) => {
  try {
    const { aiModel, strictnessMode, emailAlerts, twoFactor } = req.body;

   
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { preferences: { aiModel, strictnessMode, emailAlerts, twoFactor } } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User account targeting instance missing.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Engine optimization parameters synced successfully.',
      preferences: updatedUser.preferences
    });
  } catch (error) {
    console.error("Preferences update engine error:", error);
    return res.status(500).json({ success: false, message: 'Failed to write updated parameters state: ' + error.message });
  }
});


router.delete('/resume/:id', verifyToken, async (req, res) => {
  try {
   
    const targetRecord = await Analysis.findOne({ _id: req.params.id, userId: req.user.id });

    if (!targetRecord) {
      return res.status(404).json({ 
        success: false, 
        message: 'Document record missing or account authority credentials mismatched.' 
      });
    }

    await Analysis.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: 'Document cleared from cloud registry storage clusters.'
    });
  } catch (error) {
    console.error("Document purge routing error:", error);
    return res.status(500).json({ success: false, message: 'Purge request handling thread dropped: ' + error.message });
  }
});

module.exports = router;