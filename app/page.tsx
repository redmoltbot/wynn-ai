import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Wynn AI";

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto">
      <header className="flex items-center gap-3 px-5 py-3.5 bg-white border-b border-gray-100">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E7D4F] to-[#3A7D52] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            W
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{appName}</p>
          <p className="text-xs text-green-500">Active now</p>
        </div>
      </header>
      <ChatInterface />
    </div>
  );
}
