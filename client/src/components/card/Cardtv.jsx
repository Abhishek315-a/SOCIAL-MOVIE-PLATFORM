import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Cardtv = ({ tv }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/tv/${tv.id}`} style={{ textDecoration: "none", color: "white" }}>
          <div className="cards">
            <img
              className="cards-image"
              src={`https://image.tmdb.org/t/p/original${tv.poster_path || ""}`}
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
      )}
    </>
  );
};

export default Cardtv;
