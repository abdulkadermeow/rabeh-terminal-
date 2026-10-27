import { LineChart } from "lucide-react";

export function ChartArea() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 flex-1 relative flex items-center justify-center min-h-[300px]">
      <div className="absolute top-3 left-3 flex gap-4 text-sm font-mono">
        <span className="text-white font-bold text-lg">AAPL</span>
        <span className="text-emerald-400 text-lg">173.50</span>
      </div>
      <div className="text-zinc-700 flex flex-col items-center gap-2">
        <LineChart size={48} strokeWidth={1} />
        <span className="text-xs uppercase tracking-widest">TradingView Chart Placeholder</span>
      </div>
    </div>
  );
}