// Message types that can be received/sent
export type MessageType = 'message' | 'system' | 'user_connected' | 'user_disconnected';

// Connection status
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

// Message structure (matches server response)
export interface Message {
  type: MessageType;
  username: string;
  user_id: string;
  content: string;
  timestamp: string; // ISO timestamp from server
  channel?: string;
}

// User data for login
export interface UserData {
  username: string;
  channel: string;
}

// WebSocket message payload for sending
export interface OutgoingMessage {
  type: 'message';
  content: string;
}

