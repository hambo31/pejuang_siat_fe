import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmCard from "../components/FilmCard";
import SearchForm from "../components/SearchForm";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]); // State untuk kategori
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori yang dipilih

  // Ambil data film dan kategori dari API backend
  useEffect(() => {
    axios.get("http://localhost:8000/api/films")
      .then(response => {
        setFilms(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the films!", error);
      });

    axios.get("http://localhost:8000/api/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter films berdasarkan search term dan kategori
  const filteredFilms = films.filter(film => {
    const matchesSearchTerm = film.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || String(film.category_id) === String(selectedCategory);

    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="container mt-4">
                <h1 className="text-center mb-4">The Films</h1>

      {/* Search Bar dan Filter Kategori dalam satu baris */}
      <div className="d-flex justify-content-between mb-4">
        <div className="search-bar">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Filter by Category */}
        <div className="filter-by-category">
          <select
            className="form-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Film Grid */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredFilms.map(film => (
          <div key={film.id} className="col">
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
