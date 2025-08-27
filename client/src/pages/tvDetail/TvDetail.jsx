import React, { useEffect, useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import "./tvDetail.css";
import Cardtv from "../../components/card/Cardtv";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { REACT_APP_API_KEY } from "../../utils/constant";

const TvDetail = () => {
  const [currentTvDetail, setCurrentTvDetail] = useState([]);
  const [tvcast, setTvCast] = useState([]);
  const [tvtrailer, settvtrailer] = useState([]);
  const [tvsimilar, setTvsimilar] = useState([]);
  const [like,setLike] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    getCast();
    getTrailer();
    getSimilar();
    checkFavouriteStatus();
    window.scrollTo(0, 0);
  }, [id]);

  const checkFavouriteStatus = async () => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      if (!email || !token) return;

      const res = await fetch(`${REACT_APP_API_KEY}/favourite/status/tv?email=${email}&tvId=${id}`, {
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

  const favData = { email, tvId: id };

  // Optimistic toggle
  setLike((prev) => !prev);

  const res = await fetch(`${REACT_APP_API_KEY}/favourite/toggle/tv`, {
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
    setLike(isFavourite);
    toast.success(isFavourite ? "Added to favourites" : "Removed from favourites");
  } else {
    toast.warning(message || "Something went wrong");
  }
};


  const getData = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
      );
      const data = await res.json();
      setCurrentTvDetail(data);
    } catch (error) {
      console.error("Error fetching TV details:", error);
    }
  };

  const getCast = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
      );
      const data = await res.json();
      setTvCast(data);
    } catch (error) {
      console.error("Error fetching cast:", error);
    }
  };

  const getTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (video) =>
          video.type === "Trailer" &&
          video.site === "YouTube" &&
          video.official === true
      );
      if (trailer) {
        settvtrailer(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const getSimilar = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
      );
      const data = await res.json();
      setTvsimilar(data.results);
    } catch (error) {
      console.error("Error fetching similar shows:", error);
    }
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentTvDetail ? currentTvDetail.backdrop_path : ""
          }`}
        />
      </div>

      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentTvDetail ? currentTvDetail.poster_path : ""
              }`}
            />
          </div>
        </div>

        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentTvDetail ? currentTvDetail.original_name : ""}
            </div>
            <div className="movie__tagline">
              {currentTvDetail ? currentTvDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentTvDetail ? currentTvDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentTvDetail
                  ? "(" + currentTvDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentTvDetail
                ? currentTvDetail.episode_run_time?.[0] + " mins"
                : ""}
            </div>
            <div className="movie__releaseDate">
              {currentTvDetail
                ? "First air date: " + currentTvDetail.first_air_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentTvDetail?.genres?.map((genre) => (
                <span className="movie__genre" id={genre.id} key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="movie__detailRightBottom">
            <div>{currentTvDetail?.overview}</div>
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

          {/* Cast */}
          <div className="cast-container">
            <span>Cast</span>
            <div className="cast">
              {tvcast?.cast?.length > 0 ? (
                tvcast.cast
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

      {/* Trailer */}
      <div className="trailer-container">
        {tvtrailer ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${tvtrailer}`}
            title="TV Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Trailer not available</p>
        )}
      </div>

      {/* Similar TV Shows */}
      <div className="similar-movies">
        <span>Similar TV Shows</span>
        <div className="similar-movie-scroll">
          {tvsimilar.map((show) => (
            <div
              key={show.id}
              className="similar-movie-card"
              onClick={() => {
                console.log("Clicked TV Show:", show.id);
                navigate(`/tv/${show.id}`);
              }}
            >
              <Cardtv tv={show} />
            </div>
          ))}
        </div>
      </div>

      {/* Production Companies */}
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentTvDetail?.production_companies?.map((company) =>
          company.logo_path ? (
            <span className="productionCompanyImage" key={company.id}>
              <img
                className="movie__productionComapany"
                src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
              />
              <span>{company.name}</span>
            </span>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TvDetail;
