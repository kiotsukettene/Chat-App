import type { ConnectionStatus } from '../types/chat';

interface ChatHeaderProps {
  username: string;
  channel: string;
  connectionStatus: ConnectionStatus;
  onDisconnect: () => void;
}

export default function ChatHeader({ username, channel, connectionStatus, onDisconnect }: ChatHeaderProps) {
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
        return 'bg-yellow-500';
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              #{channel}
            </h1>
            <p className="text-sm text-gray-600">
              Connected as <span className="font-medium">{username}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {getStatusText()}
            </span>
          </div>
          
          <button
            onClick={onDisconnect}
            className="text-sm text-white-600 bg-red-400 hover:bg-red-400 font-medium px-4 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}

