import React from 'react';
import './index.css'
const FilterGroup = ({
  categoryOptions,
  sortbyOptions,
  activeOptionId,
  activeCategoryId,
  searchInput,
  locationSearch,
  setActiveOptionId,
  setActiveCategoryId,
  setSearchInput,
  setLocationSearch,
  clearFilters,

}) => {
  return (
    <div className="filter-group">
    
      
      <div className="filter-item">
        <label>Search:</label>
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Search by service"
        />
       
      </div>

      <div className="filter-item">
        <label>Location:</label>
        <input
          type="text"
          value={locationSearch}
          onChange={e => setLocationSearch(e.target.value)}
          placeholder="Enter location"
        />
      </div>

      <div className="filter-item">
        <label>Category:</label>
        <select
          value={activeCategoryId}
          onChange={e => setActiveCategoryId(e.target.value)}
        >
          <option value="">All Services</option>
          {categoryOptions.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label>Sort By:</label>
        <select
          value={activeOptionId}
          onChange={e => setActiveOptionId(e.target.value)}
        >
          {sortbyOptions.map(option => (
            <option key={option.optionId} value={option.optionId}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <button type="button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterGroup;