# ai/agents.py

def get_agents_debate(symbol: str, price: float, laya_results: dict) -> dict:
    """
    Mock Data: محاكاة لنقاش الوكلاء لعدم توفر مفتاح Claude حالياً.
    هذا يضمن استمرار تطوير الواجهة الأمامية (Frontend) واختبار التكامل.
    """
    # نستخدم البيانات الممررة (مثل السعر والاتجاه) لجعل النص المحاكي يبدو ديناميكياً
    trend_text = laya_results.get("trend", "BULLISH").lower()
    
    return {
        "analyst": f"Combined score is high for {symbol}. News headlines indicate strong momentum and a clear {trend_text} trend.",
        "devils_advocate": f"Market mood is uncertain due to upcoming rate decisions. {symbol} might face resistance at current ${price} levels.",
        "manager": "Objection noted. Reducing position size to align with 1% risk limit. Proceeding with safe entry."
    }