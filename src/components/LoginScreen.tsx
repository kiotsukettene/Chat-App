import { useState } from 'react';
import type { FormEvent } from 'react';
import type { UserData } from '../types/chat';

interface LoginScreenProps {
  onJoin: (userData: UserData) => void;
}

export default function LoginScreen({ onJoin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('general');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate username
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }

    // Clear error and submit
    setError('');
    onJoin({
      username: username.trim(),
      channel: channel.trim() || 'general',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join Chat
            </h1>
            <p className="text-gray-600">
              Enter your username and channel to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter your username"
                autoFocus
              />
            </div>

            <div>
              <label 
                htmlFor="channel" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Channel
              </label>
              <input
                type="text"
                id="channel"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="general"
              />
              <p className="mt-1 text-sm text-gray-500">
                Defaults to "general" if left empty
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

