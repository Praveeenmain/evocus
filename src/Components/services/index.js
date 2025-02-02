import React, { useState, useEffect, useCallback } from 'react';
import { TailSpin } from 'react-loader-spinner';
import FilterGroup from '../FiltersGroup';
import ServiceCard from '../ServiceCard';
import ServicesHeader from '../ServicesHeader';
import Header from '../Header';
import './index.css';

const categoryOptions = [
  { name: 'Event Manager', categoryId: 'Event Manager' },
 
  { name: 'Photography', categoryId: 'PHOTOGRAPHER' },
  { name: 'Food', categoryId: 'CATERING' },
  { name: 'Other', categoryId: 'Other' },
];

const sortbyOptions = [
  { optionId: 'highestAmount', displayText: 'Price (High-Low)' },
  { optionId: 'lowestAmount', displayText: 'Price (Low-High)' },
];

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const AllServicesSection = () => {
  const [servicesList, setServicesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const servicesPerPage = 6; // Number of services per page (updated to 6)

  const getServices = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);
    
    const apiUrl = `https://evocusbackend.onrender.com/services?sort_by=${activeOptionId}&category=${activeCategoryId}&service_search=${searchInput}&location_search=${locationSearch || ''}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const fetchedData = await response.json();
        setServicesList(fetchedData || []);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  }, [activeOptionId, activeCategoryId, searchInput, locationSearch]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  const clearFilters = () => {
    setSearchInput('');
    setActiveCategoryId('');
    setLocationSearch('');
  };

  const enterSearchInput = () => {
    getServices();
  };

  const changeSortby = (optionId) => {
    setActiveOptionId(optionId);
  };

  const renderLoadingView = () => (
    <div className="services-loader-container">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailureView = () => (
    <div className="services-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-services-error"
        className="services-failure-img"
      />
      <h1 className="services-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="services-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderServicesListView = () => {
    // Pagination logic: slice the services list to display only 6 services per page
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    const paginatedServices = servicesList.slice(startIndex, endIndex);

    if (paginatedServices.length === 0) {
      return (
        <div className="no-services-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            className="no-services-img"
            alt="no services"
          />
          <h1 className="no-services-heading">No Services Found</h1>
          <p className="no-services-description">
            We could not find any services. Try other filters.
          </p>
        </div>
      );
    }

    // Generate page numbers based on the total number of services and services per page
    const totalPages = Math.ceil(servicesList.length / servicesPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className='service-list-header'>
        <ServicesHeader  
          activeCategoryId={activeCategoryId}
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={changeSortby}
        />
        <div className="all-services-container">
          {paginatedServices.map(service => (
            <ServiceCard service={service} key={service._id} />
          ))}
        </div>
        {/* Pagination controls */}
        <div className="pagination-container">
          {pageNumbers.map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderAllServices = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderServicesListView();
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
      <div className="all-services-section">
        <FilterGroup
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
        {renderAllServices()}
      </div>
    </>
  );
};

export default AllServicesSection;
