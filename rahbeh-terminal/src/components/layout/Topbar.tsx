import { Power, Activity } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 text-zinc-300">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-white tracking-widest">RAHBEH<span className="text-blue-500">.AI</span></h1>
        <div className="flex items-center gap-2 text-xs bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
          <Activity size={14} className="text-emerald-500" />
          <span>Alpaca: CONNECTED</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-red-950 hover:bg-red-900 text-red-500 border border-red-900 px-4 py-2 rounded flex items-center gap-2 transition-colors">
          <Power size={16} />
          <span className="text-sm font-bold uppercase">Kill Switch</span>
        </button>
      </div>
    </header>
  );
}