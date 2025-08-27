import React, { useEffect, useState } from 'react';
import "../movielist/MovieList.css"; // You can rename or adjust styling
import { useNavigate } from 'react-router-dom';

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchPeople = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/person?api_key=5bf0575ec8c7af32a148d75987f08ae4&query=${searchQuery}&page=${page}`;
      const res = await fetch(url);
      const data = await res.json();

      if (page === 1) {
        setPeople(data.results);
      } else {
        setPeople((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchPeople();
    }
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
        placeholder="Search for a person (e.g., actor/actress)..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div className="list_cards">
        {people.map((person) => (
          <div
            key={person.id}
            className="cards"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/person/${person.id}`)} // You'll need to handle this route
          >
            <img
              className="cards-image"
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={person.name}
            />
            <div className="cards_overlay">
              <div className="cards_title">{person.name}</div>
              <div className="cards_description">
                Known for:{" "}
                {person.known_for
                  .map((item) => item.title || item.name)
                  .join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {people.length > 0 && (
        <div style={{ textAlign: 'center', margin: '1rem' }}>
          <button className='load-more-btn' onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonList;
