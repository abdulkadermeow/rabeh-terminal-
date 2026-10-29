"use client";

import { useState, useEffect } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { Scanner } from "@/components/ai-agents/Scanner";
import { ChartArea } from "@/components/trading/ChartArea";
import { Copilot } from "@/components/trading/Copilot";
import { Debate } from "@/components/ai-agents/Debate";

export default function TerminalDashboard() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات من السيرفر بمجرد تحميل الصفحة
    fetch("http://localhost:8000/api/analysis/AAPL")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAnalysisData(data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col">
      <Topbar />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-zinc-500 animate-pulse">
          Connecting to AI Agents & Alpaca...
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-12 gap-2 p-2 overflow-hidden">
          <div className="col-span-2 flex flex-col gap-2">
            {/* تمرير بيانات فلتر LAYA */}
            <Scanner layaData={analysisData?.laya} />
          </div>
          
          <div className="col-span-7 flex flex-col gap-2">
            {/* تمرير السعر واسم السهم */}
            <ChartArea price={analysisData?.price} symbol={analysisData?.symbol} />
            <Copilot price={analysisData?.price} symbol={analysisData?.symbol} />
          </div>
          
          <div className="col-span-3 flex flex-col gap-2 h-full">
            {/* تمرير بيانات النقاش للوكلاء الأربعة */}
            <Debate debateData={analysisData?.debate} />
          </div>
        </div>
      )}
    </div>
  );
}