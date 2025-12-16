import type { UserData } from '../types/chat';
import { useWebSocket } from '../hooks/useWebSocket';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatRoomProps {
  userData: UserData;
  onDisconnect: () => void;
}

export default function ChatRoom({ userData, onDisconnect }: ChatRoomProps) {
  const WS_URL = 'ws://localhost:8080/ws';

    const { messages, connectionStatus, error, sendMessage, disconnect } = useWebSocket({
    username: userData.username,
    channel: userData.channel,
    url: WS_URL
  });

  const handleDisconnect = () => {
    disconnect();
    onDisconnect();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader
        username={userData.username}
        channel={userData.channel}
        connectionStatus={connectionStatus}
        onDisconnect={handleDisconnect}
      />
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <p className="text-sm text-red-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}

      <MessageList 
        messages={messages} 
        currentUsername={userData.username}
      />

      <MessageInput 
        onSendMessage={sendMessage}
        connectionStatus={connectionStatus}
      />
    </div>
  );
}

