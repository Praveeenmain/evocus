import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../Context/cartcontext';
import './index.css';

const CartSummary = () => {
  const { cartList, updateTotalAmount } = useContext(CartContext);

  let total = 0;

  cartList.forEach(item => {
 
    total += Math.round(item.price) * item.quantity ;
  });

  const handleUpdateTotal = () => {
    updateTotalAmount(total);
  };

  return (
    <div className="cart-summary-container">
      <h1 className="summary-heading">Order Total: Rs {total}</h1>

      <p className="summary-paragraph">
        <span>{cartList.length}</span> items in the cart
      </p>
      <Link to="/checkout">
        <button type="button" className="checkout" onClick={handleUpdateTotal}>
            checkout
        </button>
      </Link>
    </div>
  );
};

export default CartSummary;