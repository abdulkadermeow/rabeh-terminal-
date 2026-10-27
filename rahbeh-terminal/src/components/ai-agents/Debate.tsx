import { MessageSquare, AlertTriangle } from "lucide-react";

export function Debate() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
        <MessageSquare size={16} className="text-purple-400" />
        <h2 className="text-sm font-semibold text-zinc-100 uppercase">Agents Debate</h2>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-blue-400 text-xs uppercase tracking-wider">Analyst</span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Combined score is high. News headlines indicate strong earnings beat.
          </p>
        </div>
        <div className="bg-zinc-900 border border-red-900/30 p-3 rounded text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-red-400 text-xs uppercase tracking-wider">Devil's Advocate</span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            <AlertTriangle size={12} className="inline mr-1 text-red-500"/>
            Market mood is uncertain due to upcoming rate decisions.
          </p>
        </div>
         <div className="bg-zinc-900 border border-emerald-900/30 p-3 rounded text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-emerald-400 text-xs uppercase tracking-wider">Manager</span>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Objection noted. Reducing position size to align with 1% risk limit.
          </p>
        </div>
      </div>
    </div>
  );
}