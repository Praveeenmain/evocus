import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './index.css';

const ServiceCard = ({ service }) => {
  const { serviceName, description_ser, location, highestAmount, images, lowestAmount, _id } = service;

  const imageUrl = `https://evovendors.onrender.com/image/${images[0]}`;
  const shortDescription = description_ser ? description_ser.slice(0, 40) : 'No Description Available'; // Limit description to 50 characters

  return (
    <Link to={`/service/${_id}`} className="service-card-link"> {/* Link to detailed service page */}
      <div className="service-card">
        <img src={imageUrl} alt={shortDescription} className="service-card-image" />
        <div className="service-card-content">
          <h2 className="service-card-title">{serviceName || 'No Title Available'}</h2>
          <h3 className="service-card-description">{shortDescription}</h3> {/* Display short description */}
          <p className="service-card-location">{location}</p>
          <p className="service-card-price">₹{lowestAmount}-₹{highestAmount}</p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
