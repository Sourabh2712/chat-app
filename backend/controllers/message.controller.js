const Message = require('../models/message.schema');
const User = require('../models/user.schema');

const positiveTags = ['happy', 'love', 'great', 'like', 'amazing', 'awesome'];
const negativeTags = ['sad', 'angry', 'bad'];

// Simple sentiment analysis
function getSentiment(text) {
    const lower = text.toLowerCase();
    if (lower.includes('happy') || lower.includes('love') || lower.includes('great') || lower.includes('like') || lower.includes('amazing'))

        return 'positive';
    if (lower.includes('sad') || lower.includes('angry') || lower.includes('bad'))
        return 'negative';
    return 'neutral';
}

exports.sendMessage = (io) => async (req, res) => {
    const { userId, text } = req.body;
    try {
        const message = await Message.create({ userId, text });
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ success: false, error: 'User not found' });

        // Emit new message to all clients
        io.emit('newMessage', {
            id: message._id,
            text: message.text,
            sentiment: message.sentiment,
            userName: user.name
        });

        // Async sentiment analysis
        setTimeout(async () => {
            const sentiment = getSentiment(text);
            message.sentiment = sentiment;
            await message.save();
            io.emit('sentimentUpdate', { id: message._id, sentiment });
        }, 3000);

        res.status(201).json({ success: true, messageId: message._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
