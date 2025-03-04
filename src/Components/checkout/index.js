import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../Context/cartcontext";
import "./index.css";
import Header from "../Header";
const CheckoutPage = () => {
  const { cartList, updateTotalAmount } = useContext(CartContext);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [formFilled, setFormFilled] = useState(false);

  // Calculate total amount
  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    updateTotalAmount(totalAmount);
  }, [totalAmount, updateTotalAmount]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!formFilled) {
      alert("Please fill in all form fields before proceeding with payment.");
      return;
    }
    if (!razorpayLoaded) {
      alert("Razorpay SDK is still loading. Please try again.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZOR_API_KEY, // Test Key
      amount: totalAmount * 100,
      currency: "INR",
      name: "Evobuz",
      description: "Purchase Transaction",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: formData.name,
        email: "test@example.com",
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormFilled(
      formData.name.trim() !== "" &&
        formData.phoneNumber.trim() !== "" &&
        formData.address.trim() !== ""
    );
  }, [formData]);

  return (
    <div>
    <Header/>
    <div className="checkout-container">
        
      <div className="checkout-left">
        <h2>Billing Details</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
           <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </form>
      </div>

      <div className="checkout-right">
        <h2>Order Summary</h2>
        <div className="cart-items">
          {cartList.length > 0 ? (
            cartList.map((item, index) => (
              <div key={index} className="cart-item">
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <h3>Total Amount: ₹{totalAmount}</h3>
        <button
          className="upi-payment-btn"
          onClick={handlePayment}
          disabled={!formFilled}
        >
          Proceed to UPI Payment
        </button>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;
