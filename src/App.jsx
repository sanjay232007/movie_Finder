import { useEffect,useState } from 'react'

import {useDebounce} from 'react-use'

import { updateSearchCount } from './appwrite.js'

import './App.css'
import BG from '/BG.png'
import Search from  './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;



const API_OPTIONS={
  method: 'GET',
  headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`

  }
}


 

  







function App() {


  
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


useDebounce(
  () => setDebouncedSearchTerm(searchTerm),1000,[searchTerm]
  )



const fetchMovies = async (query ='') => {
  setLoading(true);
  setErrorMessage('');

    try{
      const endpoint=query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);
      //alert(response);
      

      if(!response.ok)
      throw new Error('Failed to fetch movies');

      const data = await response.json();

      setMovieList(data.results || []);
      //console.log('API Response:', data);
      

     /* if(data.response=='false'){
      setErrorMessage(data.Error || 'Failed to fetch movies from api');
      setMovieList([]);
      return;

    }*/
     if(query && data.results?.length > 0){
     await updateSearchCount(query,data.results[0]);
     }
    }
    

    catch(error){
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
    
    finally{
      setLoading(false);
    }
  }



 useEffect(() => {
fetchMovies(debouncedSearchTerm);

},[debouncedSearchTerm])






    return (<>
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${BG})` }}
>
     <div className="pattern">
      <header>
        <img src='/hero-img.svg' alt="hero banner" />
        <h1>Movies <span className="text-gradient">Finder</span> to find the best movies</h1>
      
     <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     
     <h2 className="text-gradient">All Movies</h2>
     <p>Loading state: {String(loading)}</p>
     </header>


     <section className="all-movies">
      {
        loading ? (
          <Spinner />
        ) : errorMessage ? ( <p className="text-red-500 center">{errorMessage}</p>) : (

          <ul>
            {movieList.map((movie)=>(
              <MovieCard key={movie.id} movie={movie} />
             
            ))}
          </ul>
        )
      }
      
     </section>
     </div>

     
</div>
      </>
    )
}

export default App
