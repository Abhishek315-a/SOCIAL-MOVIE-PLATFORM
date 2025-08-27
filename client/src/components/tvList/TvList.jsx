import React, { useEffect, useState } from 'react';
import "../movielist/MovieList.css";
import Cardtv from '../card/Cardtv'; 

const TvList = () => {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTvShows = async () => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `https://api.themoviedb.org/3/search/tv?api_key=5bf0575ec8c7af32a148d75987f08ae4&query=${searchQuery}&page=${page}`
        : `https://api.themoviedb.org/3/tv/popular?api_key=5bf0575ec8c7af32a148d75987f08ae4&page=${page}`;

      const res = await fetch(url);
      const data = await res.json();

      if (page === 1) {
        setTvShows(data.results);
      } else {
        setTvShows((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTvShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='movie_list'>
      <input
        className="movie-search"
        type="text"
        placeholder="Search for TV shows..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div className="list_cards">
        {tvShows.map((tv) => (
          <Cardtv tv={tv} key={tv.id} />
        ))}
      </div>

      {tvShows.length > 0 && (
        <div style={{ textAlign: 'center', margin: '1rem' }}>
          <button className='load-more-btn' onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TvList;
