import { Filter, CheckCircle2, TrendingUp, Newspaper, Target } from "lucide-react";

export function Scanner() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
        <Filter size={16} className="text-blue-400" />
        <h2 className="text-sm font-semibold text-zinc-100 uppercase">LAYA Filter</h2>
      </div>
      
      <div className="space-y-3 text-xs">
        {/* 1. Bull or bear? */}
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Bull or bear?</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp size={14} /> BULLISH
          </span>
        </div>

        {/* 2. Company news? */}
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Company news?</span>
          <span className="text-blue-400 font-bold flex items-center gap-1">
            <Newspaper size={14} /> SPECIFIC
          </span>
        </div>

        {/* 3. Halal Check */}
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Halal Check</span>
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <CheckCircle2 size={14} /> PASS
          </div>
        </div>

        {/* 4. Worth a look? */}
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Worth a look?</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Target size={14} /> YES
          </span>
        </div>
      </div>
    </div>
  );
}