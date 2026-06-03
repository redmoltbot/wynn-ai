interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#2E7D4F] flex items-center justify-center text-white text-xs font-semibold mr-2 shrink-0 mt-0.5">
          W
        </div>
      )}
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-[#2E7D4F] text-white rounded-br-sm'
            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
