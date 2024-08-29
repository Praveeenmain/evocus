import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './index.css';

const ServiceCard = ({ service }) => {
  const { serviceName, description_ser, location, highestAmount, images, lowestAmount, _id } = service;
 
  const imageUrl = `https://evovendors.onrender.com/image/${images[0]}`;

  return (
    <Link to={`/service/${_id}`} className="service-card-link"> {/* Link to detailed service page */}
      <div className="service-card">
        <img src={imageUrl} alt={description_ser} className="service-card-image" />
        <div className="service-card-content">
          <h2 className="service-card-title">{serviceName || 'No Title Available'}</h2>
          <h3 className="service-card-description">{description_ser || 'No Description Available'}</h3>
          <p className="service-card-location">{location}</p>
          <p className="service-card-price">₹{lowestAmount}-₹{highestAmount}</p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;