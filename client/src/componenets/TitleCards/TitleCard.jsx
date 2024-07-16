import React, { useEffect, useRef, useState } from "react";
import "../TitleCards/TitleCard.css";
import cards_data from "../../assets/cards/Cards_data.js";
import { Link } from "react-router-dom";

const TitleCard = ({title, category}) => {

  const[apiResponse, SetApiResponse] = useState([])

  const cardsRef = useRef();


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTA4YTA0OThkZDU1MmYxNWRhNjBiZDEyNWEzY2I0MSIsIm5iZiI6MTcyMDgxNDcyOC43MTIwNjYsInN1YiI6IjY2OTE4YmJjNDA3MzA3OGJlZTNkODA2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z5G5F49sEccMFa3AMH690JQHwOm51vF3nbCQ5kVHV3Q'
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category?category:"popular"}?language=en-US&page=1`, options);
        const data = await response.json();
        SetApiResponse(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);


  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="titlecards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiResponse.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
