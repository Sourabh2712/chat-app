const User = require('../models/user.schema');

exports.joinChat = async (req, res) => {
  const { name } = req.body;
  try {
    let user = await User.findOne({ name });
    if (!user) {
      user = await User.create({ name });
    }
    res.json({ success: true, userId: user._id, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
