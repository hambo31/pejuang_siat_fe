import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search films..."
        />
        
      </div>
    </div>
  );
};

export default SearchForm;
