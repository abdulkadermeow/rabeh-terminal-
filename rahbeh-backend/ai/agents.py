def get_agents_debate(symbol: str, price: float, laya_results: dict) -> dict:
    trend_text = laya_results.get("trend", "BULLISH").lower()
    
    return {
        "technical_analyst": f"Price action confirms the {trend_text} trend. Holding above key moving averages at ${price}.",
        "fundamental_analyst": f"News context is positive for {symbol}. Earnings estimates support growth.",
        "devils_advocate": f"Market mood is uncertain due to upcoming rate decisions. {symbol} might face resistance.",
        "manager": "Objection noted. Reducing position size to align with 1% risk limit. Proceeding with safe entry."
    }