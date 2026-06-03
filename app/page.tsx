import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Wynn AI";

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2E7D4F] to-[#3A7D52] flex items-center justify-center text-white font-semibold text-sm shadow">
          W
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900 leading-none">{appName}</h1>
          <p className="text-xs text-[#2E7D4F] mt-0.5">Online</p>
        </div>
      </header>
      <ChatInterface />
    </div>
  );
}
