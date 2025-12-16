import { useEffect, useRef } from 'react';
import type { Message } from '../types/chat';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
}

export default function MessageList({ messages, currentUsername }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium mb-2">No messages yet</p>
            <p className="text-sm">Be the first to send a message!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          {messages.map((message, index) => (
            <MessageItem
              key={`${message.user_id}-${message.timestamp}-${index}`}
              message={message}
              currentUsername={currentUsername}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      
    </div>
  );
}

