# WebSocket Chat Application

A real-time chat application built with React, TypeScript, Vite, and WebSocket. This application allows users to join different channels and communicate in real-time.

## 🚀 Features

- Real-time messaging using WebSocket
- Multiple chat channels support
- User connection/disconnection notifications
- Clean and modern UI with Tailwind CSS
- Automatic reconnection on connection loss
- Message timestamps
- Responsive design

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js) or **yarn**
  - Verify installation: `npm --version`

- **WebSocket Server** (Go backend)
  - The server should be running on `ws://localhost:8080`
  - Make sure you have the Go server set up and running

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd KabawWebSocket
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

This will install all required dependencies including:
- React
- TypeScript
- Vite
- Tailwind CSS
- And other development dependencies

## 🏃 Running the Application

### Step 1: Start the WebSocket Server

Before starting the frontend, make sure your Go WebSocket server is running:

```bash
# Navigate to your Go server directory
cd <go-server-directory>

# Run the Go server
go run main.go
```

The server should start on `ws://localhost:8080/ws`

You should see output similar to:
```
Server started on :8080
```

### Step 2: Start the Development Server

In a new terminal, navigate to the project directory and run:

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

### Step 3: Open the Application

The application will start and display the local URL in your terminal:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:5173/`

## 🎯 How to Use

### 1. Join a Chat Channel

When you first open the application, you'll see the login screen:

1. **Enter your username** (minimum 2 characters)
2. **Enter a channel name** (defaults to "general" if left empty)
3. Click **Join Chat**

### 2. Send Messages

Once connected:
- Type your message in the input box at the bottom
- Press **Enter** or click the **Send** button
- Your message will appear in blue on the right side
- Other users' messages appear in gray on the left side

### 3. System Messages

The chat displays system notifications when:
- Users join the channel
- Users leave the channel

### 4. Disconnect

Click the **Disconnect** button in the header to leave the chat and return to the login screen.

## 🔧 Configuration

### Changing the WebSocket Server URL

If your WebSocket server is running on a different URL, update it in:

**`src/components/ChatRoom.tsx`**

```typescript
const WS_URL = 'ws://localhost:8080/ws'; // Change this to your server URL
```

### Customizing Styles

The application uses Tailwind CSS. You can customize styles in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles
- Component files - Component-specific styles

## 📁 Project Structure

```
KabawWebSocket/
├── src/
│   ├── components/          # React components
│   │   ├── ChatHeader.tsx   # Chat header with status
│   │   ├── ChatRoom.tsx     # Main chat container
│   │   ├── LoginScreen.tsx  # Login/join screen
│   │   ├── MessageInput.tsx # Message input component
│   │   ├── MessageItem.tsx  # Individual message display
│   │   └── MessageList.tsx  # Message list container
│   ├── hooks/
│   │   └── useWebSocket.ts  # WebSocket custom hook
│   ├── types/
│   │   └── chat.ts          # TypeScript type definitions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## WebSocket Connection Details

### Connection URL Format

```
ws://localhost:8080/ws?username={username}&channel={channel}
```

### Message Format

**Outgoing messages (Client → Server):**
```json
{
  "type": "message",
  "content": "Hello, World!"
}
```

**Incoming messages (Server → Client):**
```json
{
  "type": "message",
  "username": "john",
  "user_id": "abc123",
  "content": "Hello, World!",
  "timestamp": "2025-12-16T10:30:00+08:00",
  "channel": "general"
}
```

### Connection States

- **Connecting** (Yellow indicator) - Attempting to connect to server
- **Connected** (Green indicator) - Successfully connected
- **Disconnected** (Red indicator) - Connection lost or closed

### Auto-Reconnection

The application automatically attempts to reconnect if the connection is lost:
- Waits 3 seconds before attempting reconnection
- Shows "Connection lost. Attempting to reconnect..." message
- Continues trying until successful or manually disconnected

## 🏗️ Building for Production

To create a production build:

Using npm:
```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

This will create an optimized build in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## 🐛 Troubleshooting

### Issue: Cannot connect to WebSocket server

**Solution:**
1. Verify the Go server is running: `http://localhost:8080`
2. Check the WebSocket URL in `src/components/ChatRoom.tsx`
3. Check browser console for errors
4. Ensure firewall/antivirus isn't blocking port 8080

### Issue: "Connection error. Please check if the server is running."

**Solution:**
1. Start the Go WebSocket server first
2. Wait for the server to fully initialize
3. Refresh the browser page

### Issue: Messages not appearing

**Solution:**
1. Check browser console for JavaScript errors
2. Verify you're in the same channel as other users
3. Check network tab to see if WebSocket messages are being sent/received

### Issue: Port 5173 already in use

**Solution:**
- Stop other Vite dev servers running on the same port
- Or specify a different port:
  ```bash
  npm run dev -- --port 3000
  ```

## 📝 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vite](https://vitejs.dev/)
- WebSocket server built with [Go](https://golang.org/)

---

**Need help?** Open an issue on GitHub or contact the maintainers.

Happy chatting! 💬
