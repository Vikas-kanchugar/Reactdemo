/* ─────────────────────────────────────────────────────────
   CART DRAWER COMPONENT
───────────────────────────────────────────────────────── */
import { useState } from "react";

function CartDrawer({ cart, onClose, onAdd, onRemove, onClear }) {
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const [done, setDone] = useState(false);

  const place = () => {
    setDone(true);
    setTimeout(() => { setDone(false); onClear(); }, 3200);
  };

  return (
    <>
      <div className="cart-veil" onClick={onClose} />
      <aside className="cart-panel">
        <div className="cp-head">
          <div>
            <div className="cp-title">Your Order 🐟</div>
            {count > 0 && (
              <div className="cp-count">{count} item{count !== 1 ? "s" : ""} in cart</div>
            )}
          </div>
          <button className="btn-icon-sq" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <div className="ces-icon">🎣</div>
            <strong style={{ color:"var(--text-head)" }}>Your cart is empty</strong>
            <p>Add fresh seafood to get started!</p>
          </div>
        ) : (
          <div className="cp-items">
            {done && (
              <div style={{
                padding:"18px", textAlign:"center",
                background:"rgba(58,125,107,0.1)",
                border:"1.5px solid var(--sea)",
                borderRadius:"var(--r-md)",
                animation:"fadeUp 0.4s ease"
              }}>
                <div style={{ fontSize:"2rem", marginBottom:6 }}>🎉</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontWeight:600, color:"var(--sea)", marginBottom:4 }}>Order Placed!</div>
                <div style={{ fontSize:"0.8rem", color:"var(--text-muted)" }}>Your coastal feast is on its way!</div>
              </div>
            )}
            {cart.map(item => (
              <div key={item.id} className="ci-row">
                <img className="ci-thumb" src={item.img} alt={item.name} />
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-line">₹{(item.price * item.qty).toLocaleString()}</div>
                </div>
                <div className="ci-qty">
                  <button className="ci-qbtn" onClick={() => onRemove(item.id)}>−</button>
                  <span className="ci-qnum">{item.qty}</span>
                  <button className="ci-qbtn" onClick={() => onAdd(item)}>+</button>
                </div>
                <button className="ci-del" onClick={() => onRemove(item.id, true)} title="Remove">✕</button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && !done && (
          <div className="cp-foot">
            <div className="cp-total-row">
              <span className="cp-total-lbl">Total</span>
              <span className="cp-total-amt">₹{total.toLocaleString()}</span>
            </div>
            <div className="cp-note">+ taxes & delivery charges applicable</div>
            <button className="btn btn-ocean" style={{ width:"100%", padding:"15px", fontSize:"0.92rem" }} onClick={place}>
              🚀 Place Order — ₹{total.toLocaleString()}
            </button>
            <button className="cp-clear" onClick={onClear}>Clear entire cart</button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;