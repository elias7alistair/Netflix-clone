import "./App.css";
import Row from "./Row";
import requests from "./Request";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./components/Loader/Loader";
import LoaderQoutes from "./components/LoaderQuotes/LoaderQoutes";
import { useEffect, useState } from "react";
//  2 19
function App() {
const [loading,setLoading] = useState(true)

useEffect(()=>{

  setTimeout(() => {
    setLoading(false)
  }, 12000)

},[])
  
  return (
    <div className="app">
      <Navbar />
      <div className="main-body">
        {loading ? (
          <div className="loader-body d-flex flex-column justify-content-center align-items-center">
            <LoaderQoutes />
            <Loader />
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
            <Row
              title={"Action Shows"}
              fetchUrl={requests.fetchActionMovies}
            />
            <Row
              title={"Comedy Movies"}
              fetchUrl={requests.fetchComedyMovies}
            />
            <Row
              title={"Horror Shows"}
              fetchUrl={requests.fetchHorrorMovies}
            />
            <Row
              title={"Romance Movies"}
              fetchUrl={requests.fetchRomanceMovies}
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
