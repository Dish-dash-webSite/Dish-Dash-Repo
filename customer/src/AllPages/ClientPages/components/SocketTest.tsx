import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

interface Message {
  id: number;
  content: string;
  senderId: number;
  senderType: 'customer' | 'driver';
  timestamp: Date;
}

const SocketTest: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [role, setRole] = useState<'customer' | 'driver'>('customer');

  const connectSocket = useCallback(() => {
    try {
      const newSocket = io('http://localhost:3000', {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling']
      });

      newSocket.on('connect', () => {
        console.log('Socket connected with ID:', newSocket.id);
        setConnected(true);
        
        // Send user info after connection
        newSocket.emit('user-connect', {
          userId: 1, // Replace with actual user ID
          userType: role
        });
      });

      newSocket.on('connection-success', (data) => {
        console.log('Connection success:', data);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setConnected(false);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        setConnected(false);
      });

      // Keep-alive ping
      const pingInterval = setInterval(() => {
        if (newSocket.connected) {
          newSocket.emit('ping');
        }
      }, 5000);

      newSocket.on('pong', () => {
        console.log('Received pong from server');
      });

      newSocket.on('conversation-started', (data) => {
        console.log('Conversation started:', data);
        setConversationId(data.conversationId);
        setMessages(data.messages || []);
        newSocket.emit('join-conversation', { conversationId: data.conversationId });
      });

      newSocket.on('chat-message', (message: Message) => {
        console.log('Received message:', message);
        setMessages(prev => [...prev, message]);
      });

      setSocket(newSocket);

      return () => {
        clearInterval(pingInterval);
        newSocket.disconnect();
      };
    } catch (error) {
      console.error('Socket initialization error:', error);
      setConnected(false);
    }
  }, [role]);

  useEffect(() => {
    const cleanup = connectSocket();
    return () => {
      cleanup?.();
    };
  }, [connectSocket]);

  // Add a reconnect button
  const handleReconnect = () => {
    if (socket) {
      socket.disconnect();
    }
    connectSocket();
  };

  const startConversation = () => {
    if (!socket) return;
    console.log('Starting conversation...');
    socket.emit('start-conversation', {
      customerId: 1, // Replace with actual IDs from your database
      driverId: 2,
      orderId: 1
    });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !conversationId) {
      console.log('Cannot send message:', { 
        newMessage, 
        socketConnected: !!socket, 
        conversationId 
      });
      return;
    }

    const messageData = {
      conversationId,
      content: newMessage,
      senderId: role === 'customer' ? 1 : 2, // Replace with actual IDs
      senderType: role
    };

    console.log('Sending message:', messageData);
    socket.emit('send-chat-message', messageData);

    // Add message to local state immediately
    setMessages(prev => [...prev, {
      ...messageData,
      timestamp: new Date(),
      id: Date.now() // temporary ID
    }]);
    
    setNewMessage('');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        
        {/* Reconnect Button */}
        <button
          onClick={handleReconnect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reconnect
        </button>
      </div>

      {/* Start Conversation Button */}
      {!conversationId && connected && (
        <button
          onClick={startConversation}
          className="w-full bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Start Conversation
        </button>
      )}

      {/* Messages Display */}
      <div className="border rounded-lg h-96 mb-4 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              msg.senderType === role
                ? 'ml-auto bg-orange-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            <div className="text-sm">{msg.content}</div>
            <div className="text-xs opacity-75">
              {msg.senderType} - {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Form */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={!connected || !conversationId}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded ${
            connected && conversationId
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500'
          }`}
          disabled={!connected || !conversationId}
        >
          Send
        </button>
      </form>

      {/* Connection Status */}
      <div className="mt-2 text-sm text-gray-500">
        Status: {connected ? 'Connected' : 'Disconnected'}
        {conversationId ? ` | Conversation #${conversationId}` : ' | No active conversation'}
      </div>
    </div>
  );
};

export default SocketTest; 