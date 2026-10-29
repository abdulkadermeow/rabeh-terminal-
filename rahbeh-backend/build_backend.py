import os

# هيكلية الملفات ومحتواها
files = {
    "requirements.txt": """fastapi
uvicorn
alpaca-trade-api
python-dotenv""",

    ".env": """ALPACA_API_KEY=your_api_key_here
ALPACA_SECRET_KEY=your_secret_key_here
ALPACA_ENDPOINT=https://paper-api.alpaca.markets""",

    "core/safety.py": """# محرك الأمان: كود حتمي (Deterministic) غير قابل للتجاوز بواسطة الذكاء الاصطناعي
def check_risk_limit(account_balance: float, entry_price: float, stop_loss: float, position_size: int) -> dict:
    '''
    Trade-off: لماذا نمرر المتغيرات يدوياً ولا نجلبها من قاعدة البيانات هنا؟
    لضمان نقاء الدالة (Pure Function) وتسهيل الـ Unit Testing.
    '''
    potential_loss = (entry_price - stop_loss) * position_size
    max_allowed_loss = account_balance * 0.01  # 1% Risk Max

    if potential_loss > max_allowed_loss:
        return {"is_safe": False, "message": "Risk exceeds 1% limit!", "loss": potential_loss}
    return {"is_safe": True, "message": "Risk is within limits.", "loss": potential_loss}""",

    "services/alpaca_api.py": """import os
from alpaca_trade_api import REST
from dotenv import load_dotenv

load_dotenv()

# تهيئة الاتصال مع Alpaca لتنفيذ الأوامر (Paper Trading للمرحلة الأولى)
api = REST(
    key_id=os.getenv("ALPACA_API_KEY"),
    secret_key=os.getenv("ALPACA_SECRET_KEY"),
    base_url=os.getenv("ALPACA_ENDPOINT")
)

def get_live_price(symbol: str) -> float:
    '''جلب آخر سعر للسهم من مزود البيانات'''
    try:
        trade = api.get_latest_trade(symbol)
        return float(trade.price)
    except Exception as e:
        raise Exception(f"Failed to fetch price for {symbol}: {str(e)}")""",

    "ai/laya_filter.py": """# سيتم وضع منطق فلتر LAYA هنا لاحقاً (Halal check, News sentiment)
def run_laya_filter(symbol: str) -> dict:
    return {
        "halal_check": True,
        "worth_a_look": True,
        "sentiment": "BULLISH"
    }""",

    "ai/agents.py": """# سيتم وضع منطق وكلاء Claude الأربعة هنا لاحقاً
def get_agents_debate(symbol: str) -> dict:
    return {
        "analyst": "Strong momentum detected.",
        "devils_advocate": "Market is volatile today.",
        "manager": "Proceed with 1% position size."
    }""",

    "main.py": """from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.alpaca_api import get_live_price

app = FastAPI(title="Rahbeh API - Institutional Backend")

# السماح للـ Next.js بالاتصال (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/market/price/{symbol}")
async def fetch_price(symbol: str):
    try:
        price = get_live_price(symbol.upper())
        return {"symbol": symbol.upper(), "price": price, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
"""
}

# إنشاء المجلدات والملفات
for file_path, content in files.items():
    os.makedirs(os.path.dirname(file_path) if os.path.dirname(file_path) else '.', exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("✅ Backend structure built successfully!")