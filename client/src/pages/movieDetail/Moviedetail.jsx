import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Moviedetail.css";
import { useNavigate } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Card from "../../components/card/Card";
const REACT_APP_API_KEY = import.meta.env.VITE_API_BASE_URL;

const Moviedetail = () => {
  const [currentMovieDetail, setCurrentMoviedetail] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [like, setLike] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getdata();
    getCast();
    getTrailer();
    getSimilarMovies();
    checkFavouriteStatus();
    window.scrollTo(0, 0);
  }, [id]);

  const checkFavouriteStatus = async () => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      if (!email || !token) return;

      const res = await fetch(`${REACT_APP_API_KEY}/favourite/status?email=${email}&movieId=${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      const { isFavourite } = data;
      console.log("Fetched isFavourite status:", isFavourite);
      setLike(isFavourite); 
    } catch (err) {
      console.error("Failed to fetch favourite status", err);
    }
  };

  const handleFavourite = async () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  if (!email || !token) {
    toast.error("User not logged in");
    return;
  }

  const favData = { email, movieId: id };

  // Optimistic toggle
  setLike((prev) => !prev);

  const res = await fetch(`${REACT_APP_API_KEY}/favourite/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(favData)
  });

  const data = await res.json();
  const { success, message, isFavourite } = data;

  if (success) {
    setLike(isFavourite); // use actual updated value from backend
    toast.success(isFavourite ? "Added to favourites" : "Removed from favourites");
  } else {
    toast.warning(message || "Something went wrong");
  }
};


  const getSimilarMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarMovies(data.results);
      })
      .catch((err) => console.error("Failed to fetch similar movies:", err));
  };

  const getTrailer = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube" &&
            video.official === true
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((err) => console.error("Error fetching trailer:", err));
  };
  const getCast = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieCast(data));
  };

  const getdata = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5bf0575ec8c7af32a148d75987f08ae4`
    )
      .then((res) => res.json())
      .then((data) => setCurrentMoviedetail(data));
  };
  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
          <div className="like-container">
            <button
              className="like"
              onClick={handleFavourite}
              aria-label={like ? "Remove from favourites" : "Add to favourites"}
            >
              <i
                className={`fa-heart ${like ? "fa-solid" : "fa-regular"} fa-2x`}
              ></i>
            </button>

            <button className="watch-button">Watch now</button>
          </div>
          {/* cast */}
          <div className="cast-container">
            <span>Cast</span>
            <div className="cast">
              {movieCast && movieCast.cast ? (
                movieCast.cast
                  .filter((person) => person.profile_path)
                  .slice(0, 5)
                  .map((people, index) => (
                    <Link key={index} className="cast-item" to={`/person/${people.id}`}> 
                      <img
                        className="cast-image"
                        src={`https://image.tmdb.org/t/p/w500/${people.profile_path}`}
                        alt={people.name}
                      />
                      <span className="cast-name">{people.name}</span>
                      <span className="cast-character">
                        as {people.character}
                      </span>
                    </Link>
                  ))
              ) : (
                <p>No cast available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="trailer-container">
        {trailerKey ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Trailer not available</p>
        )}
      </div>
      {/* review  */}
      <div className="review-container">
        <span>Reviews(0)</span>
        <textarea name="review" className="input-review" id=""></textarea>
        <button className="post-btn">
          <MdSend /> POST
        </button>
      </div>
      {/* similar movies  */}
      <div className="similar-movies">
        <span>Similar Movies</span>
        <div className="similar-movie-scroll">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              className="similar-movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <Card movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Moviedetail;
