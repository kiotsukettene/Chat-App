# Chat Interface Setup Guide

## Overview

This is a modern, intuitive chat interface built with React, TypeScript. Currently using a mock chat implementation for frontend development and testing.

## Features Implemented

✅ **User Identification & Login**
- Login screen with username and channel inputs
- Channel defaults to "general"
- Form validation for username

✅ **Connection Status Indicator**
- Visual indicator (green/yellow/red dot)
- Status text (Connected/Connecting/Disconnected)
- Displayed in the chat header

✅ **Message History Display**
- Scrollable message list
- Auto-scroll to bottom on new messages
- Empty state when no messages

✅ **Message Types**
- Regular user messages
- System messages (centered, muted)
- User connected/disconnected notifications

✅ **Message Metadata**
- Username display
- Timestamp (12-hour format)
- User ID (first 8 characters)

✅ **Message Sending**
- Input field for typing
- Send button
- Enter key to send
- Input disabled when disconnected

✅ **Error Handling**
- Connection errors displayed in banner
- Graceful handling of disconnections
- Auto-reconnect after 3 seconds

✅ **Clean Modern Design**
- Minimal, Slack-inspired UI
- Solid blue color scheme (#3B82F6)
- Responsive layout
- Proper spacing and typography

## File Structure

```
src/
├── types/
│   └── chat.ts                 # TypeScript interfaces
├── hooks/
│   └── useMockChat.ts          # Mock chat hook for frontend testing
├── components/
│   ├── LoginScreen.tsx         # Login form
│   ├── ChatRoom.tsx            # Main chat container
│   ├── ChatHeader.tsx          # Header with status
│   ├── MessageList.tsx         # Message history
│   ├── MessageItem.tsx         # Individual message
│   └── MessageInput.tsx        # Message input field
├── App.tsx                     # Main app routing
├── App.css                     # Custom styles
└── index.css                   # Global styles
```

## Running the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

4. **Test the interface:**
   - Enter a username and channel
   - Send messages and see simulated responses from mock users (Alice, Bob, Charlie)
   - Open multiple tabs to test different users

## Current Implementation: Mock Chat

The application currently uses `useMockChat` hook which simulates a real chat experience:

- **Simulated connection delay**: Shows "Connecting..." status for 1 second
- **Welcome messages**: System messages when joining
- **Mock users**: Alice, Bob, and Charlie who randomly respond to your messages
- **Realistic delays**: Responses appear 2-4 seconds after you send a message
- **All frontend features working**: Connection status, message display, timestamps, etc.

This allows you to fully test and refine the UI/UX before connecting to a real backend.

## Future: WebSocket Integration

When ready to connect to a real backend, you'll need to:

1. **Create a WebSocket hook** (`src/hooks/useWebSocket.ts`)
2. **Update ChatRoom.tsx** to use `useWebSocket` instead of `useMockChat`
3. **Connect to your WebSocket server**

### WebSocket Server Requirements (For Future Implementation)

Your WebSocket server should:

1. **Accept connections with query parameters:**
   - `username`: The user's username
   - `channel`: The channel name
   - Example: `ws://localhost:8080?username=John&channel=general`

2. **Send messages in this format:**
   ```json
   {
     "type": "message" | "system" | "user_connected" | "user_disconnected",
     "username": "string",
     "userId": "string",
     "content": "string",
     "timestamp": 1234567890
   }
   ```

3. **Receive messages in this format:**
   ```json
   {
     "type": "message",
     "content": "string"
   }
   ```

### Example WebSocket Server (Node.js)

You can create a simple WebSocket server for testing:

```javascript
// server.js
const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
  const params = url.parse(req.url, true).query;
  const username = params.username || 'Anonymous';
  const channel = params.channel || 'general';
  const userId = Math.random().toString(36).substring(7);

  console.log(`${username} joined ${channel}`);

  // Send connection message to all clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'user_connected',
        username: 'System',
        userId: 'system',
        content: `${username} joined the chat`,
        timestamp: Date.now()
      }));
    }
  });

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'message',
          username: username,
          userId: userId,
          content: message.content,
          timestamp: Date.now()
        }));
      }
    });
  });

  ws.on('close', () => {
    console.log(`${username} left ${channel}`);
    
    // Send disconnect message
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'user_disconnected',
          username: 'System',
          userId: 'system',
          content: `${username} left the chat`,
          timestamp: Date.now()
        }));
      }
    });
  });
});

console.log('WebSocket server running on ws://localhost:8080');
```

To run the example server:
```bash
npm install ws
node server.js
```

## Testing the Application

1. Start your WebSocket server
2. Start the React application (`npm run dev`)
3. Open multiple browser windows/tabs
4. Enter different usernames in each
5. Join the same channel
6. Send messages and observe real-time updates

## Customization

### Switch to Real WebSocket

When ready, edit `src/components/ChatRoom.tsx`:
```typescript
// Replace this:
import { useMockChat } from '../hooks/useMockChat';
const { messages, connectionStatus, error, sendMessage } = useMockChat({...});

// With this:
import { useWebSocket } from '../hooks/useWebSocket';
const { messages, connectionStatus, error, sendMessage } = useWebSocket({
  username: userData.username,
  channel: userData.channel,
  url: 'ws://your-server-url:port'
});
```

### Change Color Scheme

The primary color is defined in Tailwind classes. To change from blue to another color, search and replace in all components:
- `bg-blue-500` → `bg-[yourcolor]-500`
- `text-blue-600` → `text-[yourcolor]-600`
- `ring-blue-500` → `ring-[yourcolor]-500`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

All modern browsers with WebSocket support.

