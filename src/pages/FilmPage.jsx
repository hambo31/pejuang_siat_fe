import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FilmPage = () => {
  const { id } = useParams(); // Ambil ID film dari URL
  const [film, setFilm] = useState(null);

  // Fungsi untuk mengekstrak Video ID dari URL YouTube yang berbentuk https://youtu.be/VIDEO_ID
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0]; // Mengambil video ID dari URL
    return `https://www.youtube.com/embed/${videoId}`; // Membentuk URL embed
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/films/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Film data:", data);
        setFilm(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!film) {
    return <div>Loading...</div>;
  }

  // Mengambil URL embed yang benar untuk video YouTube
  const videoEmbedUrl = getYouTubeEmbedUrl(film.video_path);

  return (
    <div className="container mt-4">
      <h1>{film.title}</h1>
      <p>{film.description}</p>

      {/* Play YouTube video using iframe */}
      <div className="video-container mb-4" style={{ position: "relative" }}>
        <iframe
          className="embed-responsive-item"
          src={videoEmbedUrl} // Menggunakan URL embed yang sudah diproses
          title={film.title}
          frameBorder="0"
          allowFullScreen
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            zIndex: 0,
          }}
        ></iframe>
      </div>

      {/* Display reviews */}
      <div className="reviews mt-5">
        <h3>Reviews</h3>
        {film.reviews && film.reviews.length > 0 ? (
          film.reviews.map((review) => (
            <div
              key={review.id}
              className="review mb-4 border p-4 rounded shadow-sm bg-dark text-white"
            >
              <p><strong>{review.user.name}</strong></p> {/* Display user name */}
              <p>{review.comment}</p>
              <p><strong>Rating: </strong>{review.rating} / 5</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default FilmPage;
