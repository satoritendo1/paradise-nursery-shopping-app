import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costStr) => {
    return parseFloat(String(costStr).replace(/[^0-9.]/g, '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Thank you for your order! Checkout functionality coming soon.');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.name} className="cart-item-card">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button className="delete-btn" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
        <div className="cart-actions">
          <button className="add-to-cart-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button
            className="get-started-button"
            onClick={handleCheckoutShopping}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
