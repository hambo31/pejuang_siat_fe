import React from "react";
import { Link } from "react-router-dom";

const FilmCard = ({ film, categories }) => {
  // Cari kategori berdasarkan category_id
  const category = categories.find(cat => cat.id === film.category_id);
  const categoryName = category ? category.name : "No Category";

  return (
    <div className="card h-100">
      <img
        src={film.thumbnail}
        className="card-img-top"
        alt={film.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{film.title}</h5>
        <p className="card-text">
          {film.description.length > 30 ? `${film.description.substring(0, 30)}...` : film.description}
        </p>
        {/* Tampilkan kategori film */}
        <p className="card-category">
          <strong>Category: </strong> 
          {categoryName}
        </p>
        <Link to={`/film/${film.id}`} className="btn btn-primary mt-auto">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default FilmCard;
