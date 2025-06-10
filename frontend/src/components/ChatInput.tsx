import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { sendMessageToChatbot } from '../api/chatbot'; // Adjusted the path to a relative location

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onAIResponse: (response: string) => void; // Add a prop for handling AI response
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, onAIResponse }) => {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      handleSendMessage(message.trim());
      setMessage('');
    }
  };

  const sendMessageToApi = async (message: string) => {
    try {
      const data = await sendMessageToChatbot(message);

      setResponseMessage(data.result);
      onAIResponse(data.result); // Pass the API response to the parent component
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('Error: Unable to send message');
    }
  };

  const handleSendMessage = (message: string) => {
    sendMessageToApi(message);
    onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200 max-h-32 min-h-[48px]"
              rows={1}
              style={{
                height: 'auto',
                overflowY: message.split('\n').length > 3 ? 'scroll' : 'hidden',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};