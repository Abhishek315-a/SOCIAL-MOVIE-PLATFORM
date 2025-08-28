import React, { useState, useEffect } from "react";
import "./FavouritePage.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
const REACT_APP_API_KEY = import.meta.env.VITE_API_BASE_URL;


const FavouritePage = () => {
  const [favouriteMovie, setFavouriteMovie] = useState([]);
  const [favouriteTv, setFavouriteTv] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovieId = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${REACT_APP_API_KEY}/favourite/movie/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      fetchMovieDetails(data.movies);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  };

  const fetchMovieDetails = async (movieIds) => {
    try {
      const promises = movieIds.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=5bf0575ec8c7af32a148d75987f08ae4`
        ).then((res) => res.json())
      );

      const movies = await Promise.all(promises);
      setFavouriteMovie(movies);
    } catch (error) {
      console.error("Error fetching movie details from TMDB:", error);
    }
  };

  const getTvId = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${REACT_APP_API_KEY}/favourite/tv/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      fetchTvDetails(data.tvs);
    } catch (error) {
      console.error("Error fetching favorite TV shows:", error);
    }
  };

  const fetchTvDetails = async (tvIds) => {
    try {
      const promises = tvIds.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=5bf0575ec8c7af32a148d75987f08ae4`
        ).then((res) => res.json())
      );

      const shows = await Promise.all(promises);
      setFavouriteTv(shows);
    } catch (error) {
      console.error("Error fetching TV show details from TMDB:", error);
    }
  };

  // ✅ Correct useEffect hook for mounting
  useEffect(() => {
    getMovieId();
    getTvId();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="main-container">
      <span>Favourite Movies</span>
      <div className="movie-container">
        {favouriteMovie.length === 0 ? (
          <p>No favourite movies found.</p>
        ) : (
          favouriteMovie.map((movie) =>
            isLoading ? (
              <div className="cards" key={movie.id}>
                <SkeletonTheme color="#202020" highlightColor="#444">
                  <Skeleton height={300} duration={2} />
                </SkeletonTheme>
              </div>
            ) : (
              <div className="cards" key={movie.id}>
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <img
                    className="cards-image"
                    src={`https://image.tmdb.org/t/p/original${
                      movie.poster_path || ""
                    }`}
                    alt={movie.original_title}
                  />
                  <div className="cards_overlay">
                    <div className="cards_title">{movie.original_title}</div>
                    <div className="cards_runtime">
                      {movie.release_date}
                      <span className="cards_rating">
                        {movie.vote_average}
                        <i className="fa-solid fa-star"></i>{" "}
                      </span>
                    </div>
                    <div className="cards_description">
                      {movie.overview.slice(0, 118) + "..."}
                    </div>
                  </div>
                </Link>
              </div>
            )
          )
        )}
      </div>

      <span>Favourite TV Shows</span>
      <div className="movie-container">
        {favouriteTv.length === 0 ? (
          <p>No favourite TV shows found.</p>
        ) : (
          favouriteTv.map((tv) =>
            isLoading ? (
              <div className="cards" key={tv.id}>
                <SkeletonTheme color="#202020" highlightColor="#444">
                  <Skeleton height={300} duration={2} />
                </SkeletonTheme>
              </div>
            ) : (
              <Link
                key={tv.id}
                to={`/tv/${tv.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="cards">
                  <img
                    className="cards-image"
                    src={`https://image.tmdb.org/t/p/original${
                      tv.poster_path || ""
                    }`}
                    alt={tv.name}
                  />
                  <div className="cards_overlay">
                    <div className="cards_title">{tv.name}</div>
                    <div className="cards_runtime">
                      {tv.first_air_date}
                      <span className="cards_rating">
                        {tv.vote_average}
                        <i className="fa-solid fa-star"></i>{" "}
                      </span>
                    </div>
                    <div className="cards_description">
                      {tv.overview ? tv.overview.slice(0, 118) + "..." : ""}
                    </div>
                  </div>
                </div>
              </Link>
            )
          )
        )}
      </div>
    </div>
  );
};

export default FavouritePage;
