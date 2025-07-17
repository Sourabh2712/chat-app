const express = require('express');
const router = express.Router();
const UserActivity = require('../models/userActivity.model');

// 1. POST /activity
router.post('/activity', async (req, res) => {
  try {
    const { userId, action } = req.body;

    if (!userId || !action) {
      return res.status(400).json({ message: 'userId and action are required.' });
    }

    const activity = new UserActivity({ userId, action });
    await activity.save();

    res.status(201).json({ message: 'Activity recorded.', activity });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// 2. GET /activity/:userId - Last 10 activities
router.get('/activity/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const activities = await UserActivity.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .select('action timestamp -_id');

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// 3. GET /activity/:userId/summary - Action counts
router.get('/activity/:userId/summary', async (req, res) => {
  try {
    const { userId } = req.params;

    const summary = await UserActivity.aggregate([
      { $match: { userId } },
      { $group: { _id: '$action', count: { $sum: 1 } } }
    ]);

    const formattedSummary = {};
    summary.forEach(item => {
      formattedSummary[item._id] = item.count;
    });

    res.json(formattedSummary);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
