import React from 'react';

const ProductFilterGroup = ({
  categoryOptions,
  sortbyOptions,
  activeOptionId,
  activeCategoryId,
  searchInput,

  setActiveOptionId,
  setActiveCategoryId,
  setSearchInput,

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
          placeholder="Search Products"
        />
       
      </div>

     

      <div className="filter-item">
        <label>Category:</label>
        <select
          value={activeCategoryId}
          onChange={e => setActiveCategoryId(e.target.value)}
        >
          <option value="">All Products</option>
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

export default ProductFilterGroup;