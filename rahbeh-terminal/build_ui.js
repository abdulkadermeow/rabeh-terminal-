const fs = require('fs');
const path = require('path');

const files = {
  "src/types/trading.ts": `export interface AgentDecision {
  agent: 'Scanner' | 'Analyst' | 'DevilsAdvocate' | 'Manager';
  status: 'pending' | 'approved' | 'rejected';
  message: string;
}

export interface LayaFilter {
  isHalal: boolean;
  newsSentiment: 'Bull' | 'Bear' | 'Neutral';
  worthLook: boolean;
}`,

  "src/lib/utils.ts": `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,

  "src/components/layout/Topbar.tsx": `import { Power, Activity } from "lucide-react";

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
}`,

  "src/components/ai-agents/Scanner.tsx": `import { Filter, CheckCircle2 } from "lucide-react";

export function Scanner() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
        <Filter size={16} className="text-blue-400" />
        <h2 className="text-sm font-semibold text-zinc-100 uppercase">LAYA Filter</h2>
      </div>
      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Halal Check</span>
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 size={14} /> Pass
          </div>
        </div>
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Worth a look?</span>
          <span className="text-emerald-400 font-bold">YES</span>
        </div>
      </div>
    </div>
  );
}`,

  "src/components/trading/ChartArea.tsx": `import { LineChart } from "lucide-react";

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
}`,

  "src/components/trading/Copilot.tsx": `import { ShieldCheck, ArrowRight } from "lucide-react";

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
}`,

  "src/components/ai-agents/Debate.tsx": `import { MessageSquare, AlertTriangle } from "lucide-react";

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
}`,

  "src/app/page.tsx": `import { Topbar } from "@/components/layout/Topbar";
import { Scanner } from "@/components/ai-agents/Scanner";
import { ChartArea } from "@/components/trading/ChartArea";
import { Copilot } from "@/components/trading/Copilot";
import { Debate } from "@/components/ai-agents/Debate";

export default function TerminalDashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col">
      <Topbar />
      <div className="flex-1 grid grid-cols-12 gap-2 p-2 overflow-hidden">
        <div className="col-span-2 flex flex-col gap-2">
          <Scanner />
        </div>
        <div className="col-span-7 flex flex-col gap-2">
          <ChartArea />
          <Copilot />
        </div>
        <div className="col-span-3 flex flex-col gap-2 h-full">
          <Debate />
        </div>
      </div>
    </div>
  );
}`
};

Object.keys(files).forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, files[filePath]);
  console.log(`Created: ${filePath}`);
});