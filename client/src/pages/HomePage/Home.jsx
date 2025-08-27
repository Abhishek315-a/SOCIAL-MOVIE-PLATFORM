import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movielist/MovieList";
import Card from "../../components/card/Card";
import Cardtv from "../../components/card/Cardtv";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topratedMovies, setTopratedMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUpcoming();
    getTrendingMovies();
    getTopRatedMovies();
    getTrendingTV();
    getTopRatedTV();
  }, []);
  const getUpcoming = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=5bf0575ec8c7af32a148d75987f08ae4"
      );
      const data = await res.json();
      setUpcoming(data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", err);
    }
  };
  const getTrendingMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=5bf0575ec8c7af32a148d75987f08ae4"
    )
      .then((res) => res.json())
      .then((data) => setTrendingMovies(data.results))
      .catch((err) => console.error("Error fetching trending movies:", err));
  };

  const getTopRatedMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=5bf0575ec8c7af32a148d75987f08ae4"
    )
      .then((res) => res.json())
      .then((data) => setTopratedMovies(data.results))
      .catch((err) => console.error("Error fetching top-rated movies:", err));
  };
  const getTrendingTV = () => {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=5bf0575ec8c7af32a148d75987f08ae4"
    )
      .then((res) => res.json())
      .then((data) => setTrendingTV(data.results))
      .catch((err) => console.error("Error fetching trending TV shows:", err));
  };

  const getTopRatedTV = () => {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=5bf0575ec8c7af32a148d75987f08ae4"
    )
      .then((res) => res.json())
      .then((data) => setTopRatedTV(data.results))
      .catch((err) => console.error("Error fetching top-rated TV shows:", err));
  };
  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        transitionTime={500}
        infiniteLoop={true}
        showStatus={false}
        showArrows={true}
      >
        {upcoming.map((movie) => (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
          >
            <div className="poster-image">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
                alt=""
              />
            </div>
            <div className="poster-image_overlay">
              <div className="poster-image_title">
                {movie ? movie.original_title : " "}
              </div>
              <div className="poster-image_runtime">
                {movie ? movie.release_date : " "}
                <span className="poster-image_rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fa-solid fa-star"></i>{" "}
                </span>
              </div>
              <div className="poster-image_description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>

      {/* Trending Movies */}
      <div className="tv-scroll-section">
        <span>Trending Movies</span>
        <div className="tv-horizontal-scroll">
          {trendingMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Top Rated Movies */}
      <div className="tv-scroll-section">
        <span>Top Rated Movies</span>
        <div className="tv-horizontal-scroll">
          {topratedMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Trending TV */}
      <div className="tv-scroll-section">
        <span>Trending TV</span>
        <div className="tv-horizontal-scroll">
          {trendingTV.map((tv) => (
            <Cardtv key={tv.id} tv={tv} />
          ))}
        </div>
      </div>

      {/* Top Rated TV */}
      <div className="tv-scroll-section">
        <span>Top Rated TV</span>
        <div className="tv-horizontal-scroll">
          {topRatedTV.map((tv) => (
            <Cardtv key={tv.id} tv={tv} />
          ))}
        </div>
      </div>

      {/* <MovieList/> */}
    </div>
  );
};

export default Home;
