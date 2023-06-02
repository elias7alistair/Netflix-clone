import "./App.css";
import Row from "./Row";
import requests from "./Request";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./components/Loader/Loader";
import LoaderQoutes from "./components/LoaderQuotes/LoaderQoutes";
import { useEffect, useState } from "react";
import SecondaryLoader from "./components/Loader/SecondaryLoader";
import axios from "axios";
import { videos } from "./data/data";
//  2 19
function App() {
  const random = Math.floor(Math.random() * 2) + "";
  const [loading, setLoading] = useState(false);
  const [moviePath, setMoviePath] = useState(false);

  useEffect(() => {
    console.log();
    setTimeout(() => {
      setLoading(false);
    }, 12000);
    setLoading(random);
    // getMovies();
    return () => {};
  }, []);
  const getMovies = async () => {
    const resp = await axios.post("http://localhost:3005/api/movies/", {
      folder: "courses",
    });
    console.log(resp, "est321t23");
    setMoviePath(resp.data.videos);
    // setLoading(false);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-body">
        {loading ? (
          <div className="loader-body d-flex flex-column justify-content-center align-items-center">
            <LoaderQoutes />
            {loading == "0" ? <Loader /> : <SecondaryLoader />}
            {/* */}
            {/* <SecondaryLoader /> */}
          </div>
        ) : (
          <>
            <Banner />
            <Row
              title={"Netflix Original"}
              fetchUrl={requests.fetchNetflixOriginals}
              isLargeRow
            />
            <Row title={"Trending Now"} fetchUrl={requests.fetchTrending} />
            <Row title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
            <Row title={"Action Shows"} fetchUrl={requests.fetchActionMovies} />
            <Row
              title={"Comedy Movies"}
              fetchUrl={requests.fetchComedyMovies}
            />
            <Row
              title={"Available Movies"}
               fetchUrl={'movies'}
              // fetchLocal={{ videos: videos }}
              isLargeRow
            />
            <Row
              title={"Available Courses"}
              // fetchUrl={'movies'}
              fetchLocal={"courses"}
              isLargeRow
            />
            <Row title={"Horror Shows"} fetchUrl={requests.fetchHorrorMovies} />
            <Row
              title={"Romance Movies"}
              fetchUrl={requests.fetchHorrorMovies}
            />
            <Row
              title={"Documentaries"}
              fetchUrl={requests.fetchDocumentaries}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
