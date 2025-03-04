import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { Carousel } from "react-responsive-carousel";
import Header from "../Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CartContext from "../../Context/cartcontext"; // Import CartContext

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addCartItem } = useContext(CartContext); // Access cart context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://evocusbackend.onrender.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
       
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="detail-content">Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product data available</div>;

  const handleImageError = (e) => {
    e.target.src = "/path/to/fallback-image.jpg";
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.productName,
      price: product.price,
      image: product.images[0], // Use the first image as thumbnail
      quantity: 1,
    };
    addCartItem(cartItem);
  };

  return (
    <>
      <Header />
      <div className="detail-container">
        <div className="detail-content">
          <div className="carousel-container">
            <div className="detail-header">
              <h2>{product.productName}</h2>
            </div>
            <Carousel showThumbs={true} infiniteLoop useKeyboardArrows autoPlay>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={`https://evovendors.onrender.com/image/${image}`}
                    alt={`${product.productName} - ${index + 1}`}
                    onError={handleImageError}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="detail-content-container">
            <div className="desc-container">
              <h3>{product.productName}</h3>
              <hr />
              <p>{product.productDescription}</p>
              <div className="price-container">
                <div className="pricebtn-container">
                  <button type="button">Price ₹{product.price}</button>
                </div>
                <div className="pricebtn-container">
                  <button type="button" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>    
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
