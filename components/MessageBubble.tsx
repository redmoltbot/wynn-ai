interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex items-end gap-2 mb-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2E7D4F] to-[#3A7D52] flex items-center justify-center text-white text-xs font-bold shrink-0">
          W
        </div>
      )}
      <div
        className={`max-w-[72%] sm:max-w-[60%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
          isUser
            ? 'bg-[#2E7D4F] text-white rounded-br-md'
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
