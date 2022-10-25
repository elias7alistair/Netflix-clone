import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
// import localMovies, { fileStrucuter } from "./personal";

const baseUrl = "https://image.tmdb.org/t/p/original/";
// let vid32 = URL.createObjectURL("");
function Row({ title, fetchUrl, fetchLocal, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [showMovie, setShowMovie] = useState(false);
  const [showCurrentVideo, setShowCurrentVideo] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [stretch, setStretch] = useState(false);
  const [moviePath, setMoviePath] = useState(false);
  const [subMovie, setSubMovie] = useState(false)
  console.log(subMovie, "ghah");
  const onKeyDown = (e) => {
    console.log(e.which, "tes323");
    if (e.which === 90) {
      setStretch(true);
    }
    if (e.which === 88) {
      setStretch(false);
    }
  };

  //
  useEffect(() => {
    if (fetchLocal) {
      getMovies();
    }
  }, [fetchLocal]);

  const getMovies = async () => {
    const resp = await axios.post("http://localhost:3005/api/movies/", {
      folder: fetchLocal,
    });
    console.log(resp, "est321t23");
    setMoviePath(resp.data.videos.[fetchLocal]);
    // setLoading(false);
  };

  // fileStrucuter()
  useEffect(() => {
    if (fetchUrl) {
      async function fetchData() {
        const request = await axios.get(fetchUrl);

        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.addEventListener("keydown", onKeyDown);
    };
    // if array empty run once only when row loads.
  }, [fetchUrl]);
  // something new to get array in data format

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleOnclick = (movie) => {
    console.table(movie);
    if (movie.videoUrl) {
      setShowMovie(movie.videoUrl);
      setTrailerUrl("");
    }
    // if (movie.id === 113988) {
    //   setShowMovie(true);
    //   return "";
    // }
    if (trailerUrl != "") {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setShowMovie(false);
          //console.log(urlParams.get("v"))
        })
        .catch((error) => console.log("nnnnnnnn", error));
    }
  };
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

  const displayRows = (rows,index) => {
    let display = []
    const result = Array.isArray(rows);
    console.log(result)
    if (result) {
      rows.map(data => {
        let name = data.name || Object.keys(data)[0];


        if (name) {


          display.push(
            <div
              key={name}
              onClick={() => {
                if (data.path) {
                  setShowMovie(data);
                  setShowCurrentVideo("personal" + data.path);
                  if(subMovie.length && !index){
                    setSubMovie(false)
                  }
                } else {
                  if (subMovie.length ) {
                    let check = subMovie?.[index]?.some(key => {
                   console.log(Object.keys(key)[0],data[name])
                      if (Object.keys(key)[0] == name) {
                        return true
                      }
                    })
                    if (check) {

                      setSubMovie([...subMovie, data[name]])
                    } else {

                      setSubMovie([data[name]])
                    }
                  } else {
                    setSubMovie([data[name]])
                  }
                }
                //else {

                // }
                // if (subMovie.length) {

                //   setSubMovie([...subMovie, data])
                // } else {
                //   setSubMovie([data])
                // }
                // console.log(test)
              }}

              className={`row__poster ${isLargeRow && "row__posterLarge"
                } local-video`}
              src={
                `${baseUrl}${name}`
                // data.id === 113988
                //   ? "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/hit-the-first-case/hit-the-first-case-poster-4.jpg"
                //   :
              }
              alt={name}
            >
              {name}
            </div>
          );
        }
      })
    }
    // if (!result) {
    //   Object.keys(rows).map(key => {
    //     let name = isNaN(key) ? Object.keys(key)[0] : Object.keys(rows[key])[0],
    //       data = isNaN(key) ? rows[name] : rows[key][name]

    //     if (name) {


    //       display.push(
    //         <div
    //           key={key}
    //           onClick={() => {
    //             if (data[0].path) {
    //               setShowMovie(data);
    //               setShowCurrentVideo("personal" + data[0].path);
    //             }
    //             //else {

    //             // }
    //             if (subMovie.length) {

    //               setSubMovie([...subMovie, data])
    //             } else {
    //               setSubMovie([data])
    //             }
    //             // console.log(test)
    //           }}
    //           key={name}
    //           className={`row__poster ${isLargeRow && "row__posterLarge"
    //             } local-video`}
    //           src={
    //             `${baseUrl}${name}`
    //             // data.id === 113988
    //             //   ? "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/hit-the-first-case/hit-the-first-case-poster-4.jpg"
    //             //   :
    //           }
    //           alt={name}
    //         >
    //           {name}
    //         </div>
    //       );
    //     }
    //   })
    // }

    return display

  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {moviePath
          && displayRows(moviePath)}

        {/* {moviePath &&
          Object.keys(moviePath).map((key) => {
            let data = moviePath[key];
            return (
              <div
              onClick={() => {
                setShowMovie(data);
                setShowCurrentVideo("personal" + data[0].path);
              }}
              key={data.name}
              className={`row__poster ${
                isLargeRow && "row__posterLarge"
              } local-video`}
              src={
                `${baseUrl}${data.name}`
                  // data.id === 113988
                  //   ? "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/hit-the-first-case/hit-the-first-case-poster-4.jpg"
                  //   :
                }
                alt={data.name}
                >
                {data[0].name}
                </div>
                );
              })} */}

        {movies &&
          movies.map((data) => (
            <img
              onClick={() => {
                handleOnclick(data);
              }}
              key={data.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={
                data.image
                  ? data.image
                  : `${baseUrl}${isLargeRow ? data.poster_path : data.backdrop_path
                  }`
                // data.id === 113988
                //   ? "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/hit-the-first-case/hit-the-first-case-poster-4.jpg"
                //   :
              }
              alt={data.name}
            />
          ))}
      </div>
      <>
        {subMovie && subMovie.map((data,i) => {
          return <div className="row__posters">{displayRows(data,i)}</div>
        })}
      </>
      {showMovie && (
        <div className={!stretch ? "wrapper-video" : "test"}>
          {/* <button onClick={() => setStretch(!stretch)}>Zoom</button> */}
          {showMovie.length > 1
            ? showMovie.map((data, i) => {
              return (
                <button
                  onClick={() => {
                    setShowCurrentVideo("personal" + data.path);
                  }}
                >
                  Episode {i + 1}
                </button>
              );
            })
            : null}
          <ReactPlayer
            url={showCurrentVideo}
            // url={
            //   `personal\shows\American.Playboy.The.Hugh.Hefner.Story.S01.720p.WEBRip\American.Playboy.The.Hugh.Hefner.Story.S01E01.720p.WEBRip.HEVC.2CH.x265.mk`
            // }
            className={!stretch ? "react-player" : "test"}
            width="100%"
            height="100%"
            // playIcon={<button>Play</button>}
            // light={true}
            controls={true}
          />
        </div>
      )}
      {trailerUrl != "" && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
