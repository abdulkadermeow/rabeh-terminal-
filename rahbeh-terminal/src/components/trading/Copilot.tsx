"use client";

import { useState } from "react";
import { ShieldCheck, ArrowRight, Loader2, CheckCircle } from "lucide-react";

export function Copilot({ price, symbol }: { price?: number, symbol?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const targetPrice = price ? price * 1.02 : 0;
  const stopLoss = price ? price * 0.99 : 0;

  const handleTradeExecution = async () => {
    if (!price || !symbol) return;
    
    setStatus("loading");
    try {
      const response = await fetch("http://localhost:8000/api/trade/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: symbol,
          price: price,
          target: targetPrice,
          stop_loss: stopLoss
        })
      });
      
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000); 
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-blue-950/20 border border-blue-900/50 rounded p-4 mt-2">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-blue-400 font-bold tracking-widest text-sm uppercase">Copilot Trade Proposal</h3>
          </div>
          <p className="text-xs text-zinc-400">Manager Agent proposes entry on {symbol || "asset"}. Awaiting your approval.</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="block text-[10px] text-zinc-500 uppercase">Entry</span>
          <span className="text-white font-mono">{price ? `$${price.toFixed(2)}` : "..."}</span>
        </div>
        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="block text-[10px] text-zinc-500 uppercase">Target</span>
          <span className="text-emerald-400 font-mono">{targetPrice ? `$${targetPrice.toFixed(2)}` : "..."}</span>
        </div>
        <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
          <span className="block text-[10px] text-zinc-500 uppercase">Stop Loss</span>
          <span className="text-red-400 font-mono">{stopLoss ? `$${stopLoss.toFixed(2)}` : "..."}</span>
        </div>
        <div className="bg-red-950/30 p-2 rounded border border-red-900/50 flex flex-col justify-center items-center">
          <span className="block text-[10px] text-red-400 uppercase font-bold flex items-center gap-1">
            <ShieldCheck size={12}/> 1% Risk Max
          </span>
        </div>
      </div>

      <button 
        onClick={handleTradeExecution}
        disabled={status === "loading" || status === "success" || !price}
        className={`w-full font-bold py-3 rounded text-sm uppercase tracking-widest transition-colors flex justify-center items-center gap-2
          ${status === "success" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : 
            status === "error" ? "bg-red-600 hover:bg-red-700 text-white" :
            "bg-blue-600 hover:bg-blue-500 text-white"}`}
      >
        {status === "idle" && <>Approve Trade (One Tap) <ArrowRight size={16} /></>}
        {status === "loading" && <><Loader2 size={16} className="animate-spin" /> Executing...</>}
        {status === "success" && <><CheckCircle size={16} /> Order Placed!</>}
        {status === "error" && <>Error - Try Again</>}
      </button>
    </div>
  );
}