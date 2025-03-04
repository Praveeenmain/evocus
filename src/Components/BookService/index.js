import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import Header from "../Header";
import "./index.css";

const BookService = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceName = params.get("serviceName");

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
      alert("Service booked successfully! A confirmation email has been sent.");
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      alert("Failed to book service. Please try again.");
    });
  };

  return (
    <div>
        <Header/>
    <div className="bookingpage-container">
      
      <h2 className="bookingpage-title">Book Service</h2>
      <p className="bookingpage-service">Service Name: {serviceName}</p>
      <form className="bookingpage-form" onSubmit={handleSubmit}>
        <input type="hidden" name="serviceName" value={serviceName} />
        
        <label className="bookingpage-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bookingpage-input"
            required
          />
        </label>
        <br />
        <label className="bookingpage-label">
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="bookingpage-input"
            required
          />
        </label>
        <br />
        <label className="bookingpage-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bookingpage-input"
            required
          />
        </label>
        <br />
        <button type="submit" className="bookingpage-button">Book Now</button>
      </form>
    </div>
    </div>
    
  );
};

export default BookService;
