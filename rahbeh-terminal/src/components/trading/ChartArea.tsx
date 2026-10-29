"use client"; // ضرورية جداً لأننا نستخدم الحالة (State) وجلب البيانات بالمتصفح

import { useState, useEffect } from "react";
import { LineChart, Activity } from "lucide-react";

export function ChartArea() {
  const [price, setPrice] = useState<string>("جاري الاتصال...");
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading");

  useEffect(() => {
    // جلب السعر الحي لسهم أبل من سيرفر FastAPI الخاص بنا
    fetch("http://localhost:8000/api/market/price/AAPL")
      .then((res) => res.json())
      .then((data) => {
        if (data.price) {
          setPrice(data.price.toFixed(2));
          setStatus("connected");
        } else {
          setPrice("Error");
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error("Backend disconnected", err);
        setPrice("Disconnected");
        setStatus("error");
      });
  }, []);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 flex-1 relative flex items-center justify-center min-h-[300px]">
      <div className="absolute top-3 left-3 flex gap-4 items-center text-sm font-mono">
        <span className="text-white font-bold text-lg">AAPL</span>
        <span className={`text-lg ${status === "connected" ? "text-emerald-400" : "text-zinc-500"}`}>
          {status === "connected" ? `$${price}` : price}
        </span>
        {status === "connected" && (
          <span className="flex items-center gap-1 text-[10px] bg-emerald-950/50 text-emerald-500 px-2 py-1 rounded border border-emerald-900/50">
            <Activity size={12} /> LIVE
          </span>
        )}
      </div>
      
      <div className="text-zinc-700 flex flex-col items-center gap-2">
        <LineChart size={48} strokeWidth={1} />
        <span className="text-xs uppercase tracking-widest">TradingView Chart Placeholder</span>
      </div>
    </div>
  );
}