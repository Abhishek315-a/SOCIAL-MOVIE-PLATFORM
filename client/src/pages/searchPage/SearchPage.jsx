import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import Cardtv from '../../components/card/Cardtv';
import CardPerson from '../../components/card/CardPerson'; 
import './searchPage.css'; 

const SearchPage = () => {
  const [searchType, setSearchType] = useState('movie'); // movie | tv | person
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
   const [selectedType, setSelectedType] = useState("movie");

  const fetchResults = async () => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `https://api.themoviedb.org/3/search/${searchType}?api_key=5bf0575ec8c7af32a148d75987f08ae4&query=${searchQuery}`
        : `https://api.themoviedb.org/3/${searchType}/popular?api_key=5bf0575ec8c7af32a148d75987f08ae4`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, [searchType]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchResults();
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [searchQuery]);

  return (
    <div className="search-page">
      <input
        className="input-search"
        type="text"
        placeholder={`Search ${searchType}s...`}
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="search-buttons">
      <button
        className={selectedType === "movie" ? "active" : ""}
        onClick={() => {setSearchType("movie"),setSelectedType("movie")}}
      >
        Movies
      </button>
      <button
        className={selectedType === "tv" ? "active" : ""}
        onClick={() => {setSearchType("tv"),setSelectedType("tv")}}
      >
        TV Shows
      </button>
      <button
        className={selectedType === "person" ? "active" : ""}
        onClick={() => {setSearchType("person"),setSelectedType("person")}}
      >
        Person
      </button>
    </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="results-list">
          {searchType === 'movie' &&
            results.map((item) => <Card key={item.id} movie={item} />)}

          {searchType === 'tv' &&
            results.map((item) => <Cardtv key={item.id} tv={item} />)}

         {searchType === 'person' &&
            results.map((item) => <CardPerson key={item.id} person={item} />)} 
        </div>
      )}
    </div>
  );
};

export default SearchPage;
