import { MessageSquare, AlertTriangle, TrendingUp, BookOpen } from "lucide-react";

export function Debate({ debateData }: { debateData?: any }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
        <MessageSquare size={16} className="text-purple-400" />
        <h2 className="text-sm font-semibold text-zinc-100 uppercase">4 AI Agents Debate</h2>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        
        {/* 1. المحلل الفني */}
        <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded text-sm">
          <div className="flex items-center gap-1 mb-1.5">
            <TrendingUp size={12} className="text-blue-400"/>
            <span className="font-bold text-blue-400 text-[10px] uppercase tracking-wider">Technical Analyst</span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            {debateData?.technical_analyst || "Waiting for technical analysis..."}
          </p>
        </div>

        {/* 2. المحلل الأساسي */}
        <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded text-sm">
          <div className="flex items-center gap-1 mb-1.5">
            <BookOpen size={12} className="text-purple-400"/>
            <span className="font-bold text-purple-400 text-[10px] uppercase tracking-wider">Fundamental Analyst</span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            {debateData?.fundamental_analyst || "Waiting for fundamental analysis..."}
          </p>
        </div>

        {/* 3. محامي الشيطان */}
        <div className="bg-red-950/20 border border-red-900/30 p-2.5 rounded text-sm">
          <div className="flex items-center gap-1 mb-1.5">
            <AlertTriangle size={12} className="text-red-400"/>
            <span className="font-bold text-red-400 text-[10px] uppercase tracking-wider">Devil's Advocate</span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            {debateData?.devils_advocate || "Waiting for risk assessment..."}
          </p>
        </div>

         {/* 4. المدير المالي */}
         <div className="bg-emerald-950/20 border border-emerald-900/30 p-2.5 rounded text-sm">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-bold text-emerald-400 text-[10px] uppercase tracking-wider">Portfolio Manager</span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            {debateData?.manager || "Waiting for final decision..."}
          </p>
        </div>

      </div>
    </div>
  );
}