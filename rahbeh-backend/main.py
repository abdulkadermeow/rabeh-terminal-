from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# استيراد الخدمات والذكاء الاصطناعي
from services.alpaca_api import get_live_price, execute_bracket_order
from ai.laya_filter import run_laya_filter
from ai.agents import get_agents_debate

app = FastAPI(title="Rahbeh API")

# السماح للواجهة (Next.js) بالاتصال بالسيرفر
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# تعريف هيكل البيانات المستقبلة من الواجهة (Data Validation)
class TradeProposal(BaseModel):
    symbol: str
    price: float
    target: float
    stop_loss: float

# ---------------------------------------------------------
# 1. مسار جلب السعر (Data Layer)
# ---------------------------------------------------------
@app.get("/api/market/price/{symbol}")
async def fetch_price(symbol: str):
    try:
        price = get_live_price(symbol.upper())
        return {"symbol": symbol.upper(), "price": price, "status": "success"}
    except Exception as e:
        return {"error": str(e), "status": "failed"}

# ---------------------------------------------------------
# 2. مسار التحليل الذكي (AI Layer)
# ---------------------------------------------------------
@app.get("/api/analysis/{symbol}")
async def analyze_stock(symbol: str):
    try:
        symbol_upper = symbol.upper()
        
        # 1. جلب السعر اللحظي لتمريره للوكلاء
        price = get_live_price(symbol_upper)
        
        # 2. عناوين أخبار محاكية (Mock Data) لغرض الـ MVP
        mock_news = ["Apple reports massive growth in services", "iPhone sales beat expectations"]
        
        # 3. تشغيل فلتر LAYA المبدئي
        laya_results = run_laya_filter(symbol_upper, mock_news)
        
        # 4. تشغيل فريق وكلاء Claude بناءً على اجتياز الفلتر
        if laya_results["worth_a_look"]:
            debate = get_agents_debate(symbol_upper, price, laya_results)
        else:
            debate = {"error": "Stock rejected by LAYA filter (Not halal or no clear trend)."}
            
        return {
            "symbol": symbol_upper,
            "price": price,
            "laya": laya_results,
            "debate": debate,
            "status": "success"
        }
    except Exception as e:
        return {"error": str(e), "status": "failed"}

# ---------------------------------------------------------
# 3. مسار التنفيذ (Execution Layer)
# ---------------------------------------------------------
@app.post("/api/trade/execute")
async def execute_trade(proposal: TradeProposal):
    try:
        # حساب الكمية مبدئياً كسهم واحد لغرض الـ MVP
        qty = 1 
        
        result = execute_bracket_order(
            symbol=proposal.symbol,
            qty=qty,
            take_profit_price=proposal.target,
            stop_loss_price=proposal.stop_loss
        )
        return {"message": "Trade executed safely.", "data": result, "status": "success"}
    except Exception as e:
        return {"error": str(e), "status": "failed"}


