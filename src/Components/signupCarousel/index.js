import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
const CarouselComponent = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel"  data-bs-interval="3000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={require('../../assets/image1.jpg')} className="d-block w-100 image-carousel" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={require('../../assets/image2.jpg')} className="d-block w-100 image-carousel" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={require('../../assets/image3.jpg')} className="d-block w-100 image-carousel" alt="Slide 3" />
        </div>
        <div className="carousel-item">
          <img src={require('../../assets/image4.jpg')} className="d-block w-100 image-carousel" alt="Slide 4" />
        </div>
        <div className="carousel-item">
          <img src={require('../../assets/image5.jpg')} className="d-block w-100 image-carousel" alt="Slide 5" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
