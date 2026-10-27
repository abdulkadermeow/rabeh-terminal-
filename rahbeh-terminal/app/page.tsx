import { Topbar } from "@/components/layout/Topbar";
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
}