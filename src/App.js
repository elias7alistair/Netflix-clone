
import './App.css';
import Row from './Row'
import requests from  './Request'
import Banner from './Banner';
import Navbar from './Navbar';
import Footer from './Footer';
//  2 19
function App() {


  return (
    <div className="app">
        <Navbar/>
        <Banner/>
      <Row title={"Netflix Original"} fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title={'Trending Now'} fetchUrl={requests.fetchTrending}/>
      <Row title={'Top Rated'} fetchUrl={requests.fetchTopRated}/>
      <Row title={'Action Movies'} fetchUrl={requests.fetchActionMovies}/>
      <Row title={'Comedy Movies'} fetchUrl={requests.fetchComedyMovies}/>
      <Row title={'Horror Movies'} fetchUrl={requests.fetchHorrorMovies}/>
      <Row title={'Romance Movies'} fetchUrl={requests.fetchRomanceMovies}/>
      <Row title={'Documentaries'} fetchUrl={requests.fetchDocumentaries}/>
      <Footer/>
    </div>
  );
}

export default App;
