import React, { useState } from 'react';

export const FilterBar = ({ onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    maxPrice: 5000,
    type: 'all'
  });

  const handleApply = () => {
    if (onFilterChange) onFilterChange(localFilters);
  };

  return (
    <div className="filter-bar p-4 bg-white shadow-md rounded-lg flex flex-wrap gap-4 items-center">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <label htmlFor="priceRange" className="text-sm font-semibold text-gray-600">Max Price</label>
          <span className="text-sm font-bold text-blue-600">${localFilters.maxPrice}</span>
        </div>
        <input 
          type="range" 
          id="priceRange" 
          value={localFilters.maxPrice}
          min="0" 
          max="10000" 
          step="500"
          onChange={(e) => setLocalFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="propertyType" className="text-sm font-semibold text-gray-600">Property Type</label>
        <select 
          id="propertyType" 
          value={localFilters.type}
          className="border rounded p-1"
          onChange={(e) => setLocalFilters(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="studio">Studio</option>
          <option value="mansion">Mansion</option>
        </select>
      </div>

      <button 
        onClick={handleApply}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </div>
  );
};