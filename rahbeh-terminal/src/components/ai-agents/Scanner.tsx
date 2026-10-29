import { Filter, CheckCircle2, XCircle } from "lucide-react";

export function Scanner({ layaData }: { layaData?: any }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
        <Filter size={16} className="text-blue-400" />
        <h2 className="text-sm font-semibold text-zinc-100 uppercase">LAYA Filter</h2>
      </div>
      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Halal Check</span>
          {layaData?.halal_check ? (
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 size={14} /> Pass
            </div>
          ) : (
             <div className="flex items-center gap-1 text-red-400">
              <XCircle size={14} /> Fail
            </div>
          )}
        </div>
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Market Trend</span>
          <span className="text-blue-400 font-bold">{layaData?.trend || "..."}</span>
        </div>
        <div className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="text-zinc-400">Worth a look?</span>
          <span className={layaData?.worth_a_look ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
            {layaData?.worth_a_look ? "YES" : "NO"}
          </span>
        </div>
      </div>
    </div>
  );
}