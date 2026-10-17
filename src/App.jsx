import { useEffect,useState } from 'react'
import heroImg from './assets/hero.png'

import './App.css'
import BG from '/BG.png'
import Search from  './components/Search.jsx'


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
  const [loading, setLoading] = useState(true);



const fetchMovies = async (searchTerm) => {
  setLoading(true);
  setErrorMessage('');

    try{
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);
      //alert(response);
      

      if(!response.ok)
      throw new Error('Failed to fetch movies');

      const data = await response.json();

      setMovieList(data.results || []);
      //console.log('API Response:', data);
      

      if(data.response=='false'){
      setErrorMessage(data.Error || 'Failed to fetch movies from api');
      setMovieList([]);
      return;

    }
    }
    

    catch(error){
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
    
    finally{
      setLoading(true);
    }
  }



 useEffect(() => {
fetchMovies();

},[])






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
          <>
<p className="text-white center">Loading...</p> 
 <div role="status" className="flex justify-center items-center py-10">
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 73.1895 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8622 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27828C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>

    <span className="sr-only">Loading...</span>
  </div>
  </>
          
        ) : errorMessage ? ( <p className="text-red-500 center">{errorMessage}</p>) : (

          <ul>
            {movieList.map((movie)=>(
             
                <p key={movie.id} className="text-white">{movie.title}</p>
                
            
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
