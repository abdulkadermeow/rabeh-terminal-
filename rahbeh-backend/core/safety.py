def check_risk_limit(account_balance: float, entry_price: float, stop_loss: float, position_size: int):
    # حساب الخسارة المحتملة
    potential_loss = (entry_price - stop_loss) * position_size
    max_allowed_loss = account_balance * 0.01 # 1% risk max[cite: 10]
    
    if potential_loss > max_allowed_loss:
        return False, "Risk exceeds 1% limit!"
    return True, "Risk is within limits."