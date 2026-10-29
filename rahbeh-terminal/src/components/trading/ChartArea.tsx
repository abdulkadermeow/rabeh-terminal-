export function ChartArea({ price, symbol }: { price?: number, symbol?: string }) {
  // استخدام السهم الممرر أو سهم افتراضي في حال التحميل
  const activeSymbol = symbol || "AAPL";

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 flex-1 relative flex flex-col min-h-[400px]">
      
      {/* شريط السعر العلوي (الخاص بنا) فوق الشارت */}
      <div className="absolute top-4 left-4 flex gap-4 text-sm font-mono z-10 bg-zinc-950/90 p-2 rounded border border-zinc-800 pointer-events-none shadow-lg">
        <span className="text-white font-bold text-lg">{symbol || "..."}</span>
        <span className="text-emerald-400 text-lg">{price ? `$${price.toFixed(2)}` : "..."}</span>
        <span className="text-emerald-400 text-xs border border-emerald-900/50 bg-emerald-950/20 px-1.5 py-0.5 rounded flex items-center">
          LIVE
        </span>
      </div>

      {/* شارت TradingView الحقيقي التفاعلي */}
      <div className="flex-1 w-full h-full rounded overflow-hidden mt-14 border border-zinc-800/50">
        <iframe
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${activeSymbol}&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowTransparency={true}
          scrolling="no"
          allowFullScreen={true}
          title={`TradingView chart for ${activeSymbol}`}
        ></iframe>
      </div>
      
    </div>
  );
}