import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import './Row.css'
import movieTrailer from 'movie-trailer'

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl,isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [ trailerUrl,setTrailerUrl] = useState("")


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // if array empty run once only when row loads.
  }, [fetchUrl]);
  // something new to get array in data format

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleOnclick = (movie)=>{
    console.table(movie)
    if (trailerUrl != ""){
      setTrailerUrl("");
    }
    else {
    
      movieTrailer(movie?.name || movie?.title || "")
      .then ( (url) => {
        const urlParams = new URLSearchParams(new URL(url).search)
       setTrailerUrl(urlParams.get("v"))
        //console.log(urlParams.get("v"))
      })
      .catch((error)=> console.log("nnnnnnnn",error))
    }
  }
  // const handleClick = (movie) => {
  //   // console.table(movie?.title)
  //   if (trailerUrl != "") setTrailerUrl("");
  //    else {
  //     movieTrailer(movie?.name || movie?.title)
  //     .then(ur => {
  //       const urlParams = new URLSearchParams(new URL(ur).search);
  //       setTrailerUrl(urlParams.get("v"));
  //     })
  //     .catch(err => console.log(err));
  //   }
  // }


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((data) => (
          <img
            onClick={()=>{handleOnclick(data)}}
            key={data.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${isLargeRow ? data.poster_path : data.backdrop_path}`}
            alt={data.name}
          />
        ))}
      </div>
      {trailerUrl != ""  && <YouTube  videoId={trailerUrl}  opts={opts}/> }
    </div>
  );
}

export default Row;
