import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PersonDetail.css';
import Card from '../../components/card/Card'; // If you want to show known-for titles using Card

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    fetchPerson();
    fetchCredits();
  }, [id]);

  const fetchPerson = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
      );
      const data = await res.json();
      setPerson(data);
    } catch (err) {
      console.error("Error fetching person details", err);
    }
  };

  const fetchCredits = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=5bf0575ec8c7af32a148d75987f08ae4&language=en-US`
      );
      const data = await res.json();
      setCredits(data.cast || []);
    } catch (err) {
      console.error("Error fetching person credits", err);
    }
  };

  return person ? (
    <div className="person-detail-container">
      <div className="person-header">
        <img
          className="person-image"
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={person.name}
        />
        <div className="person-info">
          <h2>{person.name}</h2>
          <p><strong>Birthday:</strong> {person.birthday}</p>
          <p><strong>Place of Birth:</strong> {person.place_of_birth}</p>
          <p><strong>Biography:</strong> {person.biography || 'No biography available.'}</p>
        </div>
      </div>

      <div className="known-for-section">
        <h3>Known For</h3>
        <div className="known-for-scroll">
          {credits
            .filter(item => item.poster_path)
            .slice(0, 10)
            .map(item => (
              <div
                className="known-for-card"
                key={item.id}
                onClick={() => navigate(`/${item.media_type}/${item.id}`)}
              >
                <Card movie={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PersonDetail;
