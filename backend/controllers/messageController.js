const { Message, Conversation } = require('../database/associations');

exports.createMessage = async (req, res) => {
  try {
    const { content, senderId, senderType, conversationId } = req.body;
    const message = await Message.create({
      content,
      senderId,
      senderType,
      conversationId
    });
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 