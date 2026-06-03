'use client';

import { useRef, useEffect, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, userMessage }),
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Something went wrong. Try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 select-none">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2E7D4F] to-[#3A7D52] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              W
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Wynn</p>
              <p className="text-xs text-gray-400 mt-0.5">Say something interesting.</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2E7D4F] to-[#3A7D52] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  W
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:120ms]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
