import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Phone } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'driver';
  timestamp: Date;
}

interface OrderChatProps {
  orderId: string;
  customerId: string;
  driverName: string;
  driverPhone: string;
}

const OrderChat: React.FC<OrderChatProps> = ({ orderId, customerId, driverName, driverPhone }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.emit('join-order-tracking', orderId);

    newSocket.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [orderId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      orderId,
      message: newMessage,
      sender: 'customer',
      timestamp: new Date()
    };

    socket.emit('send-message', messageData);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center bg-orange-500 text-white rounded-t-lg">
        <div>
          <h3 className="font-semibold">Chat with {driverName}</h3>
          <p className="text-sm opacity-90">Order #{orderId}</p>
        </div>
        <a 
          href={`tel:${driverPhone}`}
          className="flex items-center gap-2 bg-white text-orange-500 px-3 py-1 rounded-full hover:bg-orange-50"
        >
          <Phone size={16} />
          <span className="text-sm">Call Driver</span>
        </a>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'customer'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderChat; 