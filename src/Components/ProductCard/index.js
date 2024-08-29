import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const ProductCard = ({ product }) => {
  const {
    images,
    price,
    productCategory,
    productDescription,
    productName,
    _id,
  } = product;

  // Construct the link URL for the product details page
  const productLink = `/product/${_id}`;

  return (
    <Link to={productLink} className="service-card-link">
      <div className="product-card">
        <img
          src={`https://evovendors.onrender.com/image/${images[0]}`}
          alt={productName}
          className="product-image"
        />
        <div className="product-details">
          <h2 className="product-name">{productName}</h2>
          <p className="product-category">{productCategory}</p>
          <p className="product-description">{productDescription}</p>
          <p className="product-price"> ₹{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;