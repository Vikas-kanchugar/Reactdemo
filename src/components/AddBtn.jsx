/* ─────────────────────────────────────────────────────────
   ADD BUTTON COMPONENT
───────────────────────────────────────────────────────── */
import { useState } from "react";

function AddBtn({ item, onAdd }) {
  const [ok, setOk] = useState(false);
  const [show, setShow] = useState(false);

  const handle = () => {
    if (onAdd && typeof onAdd === 'function') {
      onAdd(item);
      setOk(true);
      setShow(true);
      
      setTimeout(() => {
        setOk(false);
      }, 1100);
      
      setTimeout(() => {
        setShow(false);
      }, 2500);
    }
  };

  return (
    <>
      <button
        className={`add-to-cart${ok ? " done" : ""}`}
        onClick={handle}
        title="Add to cart">
        {ok ? "✓" : "+"}
      </button>
      
      {show && (
        <div className="add-toast">
          <div className="toast-content">
            🎉 {item.name} added to cart!
          </div>
        </div>
      )}
    </>
  );
}

export default AddBtn;