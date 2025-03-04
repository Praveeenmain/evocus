import React from 'react';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import CartContext from '../../Context/cartcontext';
import './index.css';

const CartItem = ({ cartItemDetails }) => {
  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value;

        const {
          id,
          title,
          name,
          image,
          price,
          quantity
        } = cartItemDetails;

        const onRemoveCartItem = () => {
          removeCartItem(id);
        };

        const onIncrementCartItem = () => {
          incrementCartItemQuantity(id);
        };

        const onDecrementCartItem = () => {
          decrementCartItemQuantity(id);
        };

     

      

        return (
          <li className="cart-item">
            <img className="cart-product-image"src={`https://evovendors.onrender.com/image/${image}`} alt={title} />
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <p className="cart-product-title">{name}</p>
            
              </div>
              <div className="cart-quantity-container">
                <button
                  onClick={onDecrementCartItem}
                  type="button"
                  className="quantity-controller-button"
                >
                  <BsDashSquare color="#52606D" size={12} />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  onClick={onIncrementCartItem}
                  type="button"
                  className="quantity-controller-button"
                >
                  <BsPlusSquare color="#52606D" size={12} />
                </button>
              </div>
              <div className="total-price-remove-container">
                <p className="cart-total-price">Rs{price}/-</p>
                <button
                  className="remove-button"
                  type="button"
                  onClick={onRemoveCartItem}
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </li>
        );
      }}
    </CartContext.Consumer>
  );
};

export default CartItem;