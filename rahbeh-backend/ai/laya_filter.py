# ai/laya_filter.py
def run_laya_filter(symbol: str, news_headlines: list) -> dict:
    """
    LAYA Filter: فحص سريع ومجاني ومفتوح المصدر قبل إرسال البيانات لكلود
    """
    # 1. Halal Check (قائمة مبسطة مؤقتة للـ MVP، لاحقاً تجلب من DB)
    non_halal_sectors = ["Banks", "Alcohol", "Gambling"]
    symbol_sector = "Tech" # مفترض لـ AAPL
    is_halal = symbol_sector not in non_halal_sectors
    
    # 2. Bull or Bear? (تحليل مبدئي للكلمات المفتاحية بالأخبار)
    bullish_keywords = ["growth", "beat", "up", "profit", "surge"]
    bearish_keywords = ["loss", "down", "miss", "drop", "lawsuit"]
    
    sentiment_score = 0
    for news in news_headlines:
        if any(word in news.lower() for word in bullish_keywords): sentiment_score += 1
        if any(word in news.lower() for word in bearish_keywords): sentiment_score -= 1
        
    trend = "BULLISH" if sentiment_score > 0 else "BEARISH" if sentiment_score < 0 else "NEUTRAL"
    
    # 3. Worth a look? (إذا كان حلال وفيه حركة واضحة)
    worth_a_look = is_halal and trend != "NEUTRAL"
    
    return {
        "halal_check": is_halal,
        "trend": trend,
        "company_news": "SPECIFIC", # مفترض حالياً
        "worth_a_look": worth_a_look
    }