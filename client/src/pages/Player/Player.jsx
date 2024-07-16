import React, { useEffect, useState } from "react";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";

import back_arrow_icon from "../../assets/back_arrow_icon.png";
const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate()


  const [apiResponse, SetApiResponse] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTA4YTA0OThkZDU1MmYxNWRhNjBiZDEyNWEzY2I0MSIsIm5iZiI6MTcyMDgxNDcyOC43MTIwNjYsInN1YiI6IjY2OTE4YmJjNDA3MzA3OGJlZTNkODA2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z5G5F49sEccMFa3AMH690JQHwOm51vF3nbCQ5kVHV3Q",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await response.json();
        SetApiResponse(data.results[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt=""  onClick={()=>{
        navigate(-2)
      }}/>
      <iframe
        src={`https://www.youtube.com/embed/${apiResponse.key}`}
        width="90%"
        height="90%"
        title="trailer"
        frameborder="0"
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>
          {apiResponse.published_at
            ? apiResponse.published_at.slice(0, 10)
            : ""}
        </p>
        <p>{apiResponse.name ? apiResponse.name : ""}</p>
        <p>{apiResponse.type ? apiResponse.type : ""}</p>
      </div>
    </div>
  );
};

export default Player;
