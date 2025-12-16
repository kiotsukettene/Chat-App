import type { Message } from "../types/chat";

interface MessageItemProps {
  message: Message;
  currentUsername: string;
}

export default function MessageItem({
  message,
  currentUsername,
}: MessageItemProps) {
  const isOwnMessage = message.username === currentUsername;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (message.type === "system") {
    return (
      <div className="flex justify-center py-2">
        <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] flex flex-col ${
          isOwnMessage ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-baseline space-x-2 mb-1">
          <span
            className={`text-sm font-semibold ${
              isOwnMessage ? "text-blue-600" : "text-gray-900"
            }`}
          >
            {isOwnMessage ? message.username : message.username}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div
          className={`px-4 py-2 rounded-lg ${
            isOwnMessage
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
        {isOwnMessage && message.user_id && (
          <span className="text-xs text-gray-400 mt-1">
            ID: {message.user_id}
          </span>
        )}
      </div>
    </div>
  );
}
