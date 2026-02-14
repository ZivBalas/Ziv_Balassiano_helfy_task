import React, { useState } from 'react';
import "../styles/FilterBar.css";
function FilterBar({ filter, onFilterChange, counts }) {
    const filters = [
      { key: "all", label: "All" },
      { key: "pending", label: "Pending" },
      { key: "completed", label: "Completed" },
    ];
  
    return (
      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => onFilterChange(f.key)}
          >
            {f.label}
            <span className="filter-count">{counts[f.key]}</span>
          </button>
        ))}
      </div>
    );
  }
  
  export default FilterBar;