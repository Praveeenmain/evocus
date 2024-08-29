import React, { useState, useEffect, useCallback } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ProductFilterGroup from '../ProductFliterGroup'; // Corrected import path
import ProductCard from '../ProductCard'; // Corrected import path
import ProductHeader from '../ProductHeader';
import Header from '../Header';
import './index.css';

const productCategories = {
  "Apparel and Accessories": [
    "Costumes",
    "Formal Wear",
    "Accessories",
    "Designer Dresses",
    "Shoes",
  ],
  "Gifts and Keepsakes": [
    "Personalized Gifts",
    "Souvenirs",
    "Gift Wrapping Supplies",
  ],
  Stationery: ["Invitations", "Thank You Cards", "Event Programs"],
  "Event Technology": [
    "AR/VR Equipment",
    "Event Management Software",
    "Ticketing Systems",
  ],
  "Health and Beauty": [
    "Skincare Products",
    "Makeup Products",
    "Hair Care Products",
  ],
  "Handloom and Artisan Products": [
    "Handloom Fabrics",
    "Handcrafted Decor",
    "Artisan Jewelry",
  ],
  "Bridal and Wedding": [
    "Bridal Dresses",
    "Bridesmaid Dresses",
    "Wedding Shoes",
    "Bridal Accessories",
  ],
  "Home and Living": ["Home Decor", "Kitchenware", "Furniture"],
  "Fashion and Clothing": ["Men's Wear", "Women's Wear", "Kids' Wear"],
};

const categoryOptions = Object.keys(productCategories).map(category => ({
  name: category,
}));

const sortbyOptions = [
  { optionId: 1, displayText: 'Price (High-Low)' },
  { optionId: -1, displayText: 'Price (Low-High)' },
];

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const AllProductSection = () => {
  const [productList, setProductList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const getProducts = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const apiUrl = `https://evocusbackend.onrender.com/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&location_search=${locationSearch}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const fetchedData = await response.json();
        setProductList(fetchedData || []);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  }, [activeOptionId, activeCategoryId, searchInput, locationSearch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const clearFilters = () => {
    setSearchInput('');
    setActiveCategoryId('');
    setLocationSearch('');
  };

  const enterSearchInput = () => {
    getProducts();
  };

  const changeSortby = (optionId) => {
    setActiveOptionId(optionId);
  };

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="products-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderProductListView = () => {
    if (productList.length === 0) {
      return (
        <div className="no-products-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            className="no-products-img"
            alt="no products"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-description">
            We could not find any products. Try other filters.
          </p>
        </div>
      );
    }

    return (
      <div className="product-list-header">
        <ProductHeader 
          activeCategoryId={activeCategoryId}
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={changeSortby}
        />
        <div className="all-products-container">
          {productList.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    );
  };

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductListView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="all-products-section">
        <ProductFilterGroup
          categoryOptions={categoryOptions}
          sortbyOptions={sortbyOptions}
          activeOptionId={activeOptionId}
          activeCategoryId={activeCategoryId}
          searchInput={searchInput}
          locationSearch={locationSearch}
          setActiveOptionId={setActiveOptionId}
          setActiveCategoryId={setActiveCategoryId}
          setSearchInput={setSearchInput}
          setLocationSearch={setLocationSearch}
          clearFilters={clearFilters}
          enterSearchInput={enterSearchInput}
        />
        {renderAllProducts()}
      </div>
    </>
  );
};

export default AllProductSection;
