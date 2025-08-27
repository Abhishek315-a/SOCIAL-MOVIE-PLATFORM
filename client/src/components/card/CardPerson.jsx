import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './card.css';
import { Link } from 'react-router-dom';

const CardPerson = ({ person }) => {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isloading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/person/${person.id}`}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <div className="cards">
            <img
              className="cards-image"
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={person.name}
            />
            <div className="cards_overlay">
              <div className="cards_title">{person.name}</div>
              <div className="cards_runtime">
                {person.known_for_department || 'N/A'}
              </div>
              <div className="cards_description">
                {person.known_for?.length > 0
                  ? person.known_for
                      .map((item) => item.title || item.name)
                      .slice(0, 3)
                      .join(', ')
                  : 'No popular work found.'}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CardPerson;
