import React, { useEffect, useState } from 'react';
import "./MovieList.css";
import Card from '../card/Card';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Fetch movies (popular or search)
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=5bf0575ec8c7af32a148d75987f08ae4&query=${searchQuery}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=5bf0575ec8c7af32a148d75987f08ae4&page=${page}`;

      const res = await fetch(url);
      const data = await res.json();

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='movie_list'>
      <input
        className="movie-search"
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div className="list_cards">
        {movies.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>

      {movies.length > 0 && (
        <div style={{ textAlign: 'center', margin: '1rem' }}>
          <button className='load-more-btn' onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
