import { ShieldCheck, ArrowRight } from "lucide-react";

export function Copilot() {
  return (
    <div className="bg-blue-950/20 border border-blue-900/50 rounded p-4 mt-2">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-blue-400 font-bold tracking-widest text-sm uppercase">Copilot Trade Proposal</h3>
          </div>
          <p className="text-xs text-zinc-400">Manager Agent proposes entry. Awaiting your approval.</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="block text-[10px] text-zinc-500 uppercase">Entry</span>
          <span className="text-white font-mono">$173.50</span>
        </div>
        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="block text-[10px] text-zinc-500 uppercase">Target</span>
          <span className="text-emerald-400 font-mono">$180.00</span>
        </div>
        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="block text-[10px] text-zinc-500 uppercase">Stop Loss</span>
          <span className="text-red-400 font-mono">$171.00</span>
        </div>
        <div className="bg-red-950/30 p-2 rounded border border-red-900/50 flex flex-col justify-center items-center">
          <span className="block text-[10px] text-red-400 uppercase font-bold flex items-center gap-1">
            <ShieldCheck size={12}/> 1% Risk Max
          </span>
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded text-sm uppercase tracking-widest transition-colors flex justify-center items-center gap-2">
        Approve Trade (One Tap) <ArrowRight size={16} />
      </button>
    </div>
  );
}