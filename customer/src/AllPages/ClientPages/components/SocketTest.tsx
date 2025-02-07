import React, { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  content: string;
  senderId: number;
  senderType: 'customer' | 'driver';
  timestamp: Date;
}

// Add this interface near the top of the file
interface CustomSocket extends Socket {
  pingInterval?: NodeJS.Timeout;
}

const SocketTest: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<CustomSocket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [role, setRole] = useState<'customer' | 'driver'>('customer');

  const connectSocket = useCallback(() => {
    try {
      console.log('Attempting to connect socket...');
      
      // Close existing socket if any
      if (socket) {
        console.log('Closing existing socket...');
        socket.disconnect();
        clearInterval((socket as CustomSocket).pingInterval);
      }

      const newSocket = io('http://localhost:3000', {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'],
        autoConnect: true
      });

      // Socket event handlers setup
      const setupSocketEvents = () => {
        newSocket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          setConnected(false);
        });

        newSocket.on('connect', () => {
          console.log('Socket connected with ID:', newSocket.id);
          setConnected(true);
          
          // Send user info after connection
          const userInfo = {
            userId: role === 'customer' ? 1 : 99999,
            userType: role
          };
          console.log('Sending user info:', userInfo);
          newSocket.emit('user-connect', userInfo);
        });

        newSocket.on('disconnect', (reason) => {
          console.log('Socket disconnected:', reason);
          setConnected(false);
          clearInterval((newSocket as CustomSocket).pingInterval);
        });

        newSocket.on('conversation-started', (data) => {
          console.log('Conversation started:', data);
          setConversationId(data.conversationId);
          setMessages(data.messages || []);
          newSocket.emit('join-conversation', { conversationId: data.conversationId });
        });

        newSocket.on('chat-message', (message: Message) => {
          console.log('Received message:', message);
          setMessages(prev => {
            console.log('Previous messages:', prev);
            return [...prev, message];
          });
        });
      };

      setupSocketEvents();
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          console.log('Cleanup: disconnecting socket...');
          clearInterval((newSocket as CustomSocket).pingInterval);
          newSocket.disconnect();
        }
      };
    } catch (error) {
      console.error('Socket initialization error:', error);
      setConnected(false);
    }
  }, [role]);

  // Single useEffect for socket initialization
  useEffect(() => {
    const cleanup = connectSocket();
    return () => {
      if (cleanup) cleanup();
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
      customerId: 1,
      driverId: 1,
      orderId: 1
    });
  };

  // Add error handling for conversation start failure
  useEffect(() => {
    if (!socket) return;

    socket.on('conversation-error', (error) => {
      console.error('Conversation error:', error);
      // You might want to show this error to the user
    });

    return () => {
      socket.off('conversation-error');
    };
  }, [socket]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Message change event:', e.target.value);
    setNewMessage(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add detailed debugging
    console.log('Send Message Attempt:', {
      newMessage,
      socketExists: !!socket,
      socketConnected: socket?.connected,
      conversationId,
      role,
      connected
    });

    if (!newMessage.trim() || !socket || !conversationId) {
      console.log('Cannot send message - Failed conditions:', { 
        messageEmpty: !newMessage.trim(), 
        noSocket: !socket, 
        noConversation: !conversationId 
      });
      return;
    }

    const messageData = {
      conversationId,
      content: newMessage,
      senderId: role === 'customer' ? 1 : 99999,
      senderType: role
    };

    console.log('Sending message data:', messageData);
    socket.emit('send-chat-message', messageData);
    setNewMessage('');
  };

  // Add socket event listener for message errors
  useEffect(() => {
    if (!socket) return;

    socket.on('message-error', (error) => {
      console.error('Server reported message error:', error);
    });

    return () => {
      socket.off('message-error');
    };
  }, [socket]);

  // Add debugging for message state changes
  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);

  // Add debugging for socket connection status
  useEffect(() => {
    console.log('Socket connection status:', {
      socketExists: !!socket,
      connected,
      conversationId
    });
  }, [socket, connected, conversationId]);

  // Add this near the top of your component to debug state
  useEffect(() => {
    console.log('Component state:', {
      connected,
      conversationId,
      socket: !!socket,
      messages: messages.length
    });
  }, [connected, conversationId, socket, messages]);

  // Add this function to handle role toggle
  const toggleRole = () => {
    setRole(currentRole => currentRole === 'customer' ? 'driver' : 'customer');
  };

  // Add clearChat function
  const clearChat = () => {
    setMessages([]);
    setConversationId(null);
    setNewMessage('');
    console.log('Chat cleared');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Add Role Toggle Button at the top */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        
        <button
          onClick={toggleRole}
          className={`px-4 py-2 rounded ${
            role === 'customer' ? 'bg-blue-500' : 'bg-green-500'
          } text-white`}
        >
          Current Role: {role}
        </button>
        
        <button
          onClick={handleReconnect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reconnect
        </button>
      </div>

      {/* Start Conversation Button */}
      <div className="flex justify-between mb-4">
        {!conversationId && connected && (
          <button
            onClick={startConversation}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Start Conversation
          </button>
        )}
        
        {conversationId && (
          <button
            onClick={clearChat}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            End Chat
          </button>
        )}
      </div>

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
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded ${
            newMessage.trim()
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500'
          }`}
          disabled={!newMessage.trim() || !conversationId}
        >
          Send
        </button>
      </form>

      {/* Add debug info */}
      <div className="mt-2 text-xs text-gray-500">
        Debug: Connected: {String(connected)} | 
        ConversationId: {conversationId || 'none'} | 
        Socket: {socket ? 'exists' : 'none'} |
        Role: {role} |
        Message: {newMessage}
      </div>

      {/* Connection Status */}
      <div className="mt-2 text-sm text-gray-500">
        Status: {connected ? 'Connected' : 'Disconnected'}
        {conversationId ? ` | Conversation #${conversationId}` : ' | No active conversation'}
      </div>
    </div>
  );
};

export default SocketTest; 