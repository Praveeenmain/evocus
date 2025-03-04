import React from 'react';
import CartContext from '../../Context/cartcontext';
import CartItem from '../CartItem';

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const { cartList} = value;
        console.log(cartList)
      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      );
    }}
  </CartContext.Consumer>
);

export default CartListView;