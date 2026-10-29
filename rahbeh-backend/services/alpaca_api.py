import os
from alpaca_trade_api import REST
from dotenv import load_dotenv

load_dotenv()

api = REST(
    os.getenv("ALPACA_API_KEY"),
    os.getenv("ALPACA_SECRET_KEY"),
    os.getenv("ALPACA_ENDPOINT")
)

def get_live_price(symbol: str):
    # جلب آخر صفقة للسهم
    trade = api.get_latest_trade(symbol)
    return trade.price
def execute_bracket_order(symbol: str, qty: int, take_profit_price: float, stop_loss_price: float) -> dict:
    """
    تنفيذ أمر شراء مع أوامر حماية (Take Profit & Stop Loss)
    Trade-off: نستخدم Market Order للدخول السريع في الـ MVP، 
    لكن في النسخة النهائية سنستخدم Limit Order لتجنب الانزلاق السعري (Slippage).
    """
    try:
        order = api.submit_order(
            symbol=symbol,
            qty=qty,
            side='buy',
            type='market',
            time_in_force='gtc',
            order_class='bracket',
            take_profit={'limit_price': round(take_profit_price, 2)},
            stop_loss={'stop_price': round(stop_loss_price, 2)}
        )
        return {"status": "success", "order_id": order.id, "symbol": symbol}
    except Exception as e:
        raise Exception(f"Order Execution Failed: {str(e)}")