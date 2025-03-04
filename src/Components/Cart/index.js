import React, { Component } from "react";
import Header from "../Header";
import CartContext from "../../Context/cartcontext";
import CartListView from '../CartListView'
import CartSummary from "../CartSummary";
import { Link } from "react-router-dom";
import './index.css'
class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { cartList, removeAllCartItems } = value; // Assuming there's a clearCart function in your context

          return (
            <div>
              <Header />
              {
                cartList.length === 0 ? (
                    <div className="cart-empty-view-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                      className="cart-empty-img"
                      alt="cart empty"
                    />
                    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
                
                    <Link to="/books">
                      <button type="button" className="shop-now-btn">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="cart-content-container">
                  
                    <div className="button-container">
                      <button
                        className="clear-button"
                        type="button"
                        onClick={removeAllCartItems} // Assuming this function clears the cart
                      >
                        Clear All
                      </button>
                    </div>
                    <CartListView cartItems={cartList} /> {/* Pass cartList as prop */}
                    <CartSummary cartItems={cartList} /> {/* Pass cartList as prop */}
                  </div>
                )
              }
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Cart;