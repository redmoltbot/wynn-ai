'use client';

import { useState, useRef } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="px-4 py-3 bg-white border-t border-gray-100">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Message Wynn..."
          disabled={isLoading}
          autoFocus
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={submit}
          disabled={isLoading || !input.trim()}
          className="shrink-0 w-8 h-8 rounded-full bg-[#2E7D4F] hover:bg-[#3A7D52] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          aria-label="Send"
        >
          {isLoading ? (
            <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 text-white translate-x-px" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-300 mt-1.5">Press Enter to send</p>
    </div>
  );
}
