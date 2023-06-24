import React, { useEffect, useState } from 'react';
import './App.css';

import SearchBar from './components/search-bar';
import GenreSelect from './components/genre-select';
import GameList from './components/game-list';
import ErrorMensage from './components/error';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const headers = {
        'dev-email-address': 'pedrohenrique1108@gmail.com'
      };

      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort();
        setError('O servidor demorou para responder, tente mais tarde')
      }, 5000)  
  
      const response = await fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/', {
        headers, 
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      setLoading(false);

      if (!response.ok) {
        handleFetchError(response.status)
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        setGames(data);
        const genres = data.map((game)=>(
          game.genre
        ));
        setAllGenres([...new Set(genres)])
      } else {
        setGames([]);
      }


    } catch (error) {
      setError('O servidor não conseguiu responder por agora, tente novamente mais tarde');
  }
};

  const handleFetchError = (statusCode) => {
    setLoading(false);

    const knownErrors = new Set([500, 502, 503, 504, 507, 508, 509])

    if (knownErrors.has(statusCode)) {
      setError('O servidor falhou em responder, tente recarregar a página');
    } else {
      setError('O servidor não conseguiu responder por agora, tente novamente mais tarde');
    }
  };

    const filteredGames = games.filter((game) => {
      if (selectedGenre !== 'all') {
        return game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              game.genre == selectedGenre
      } 
      return game.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
  );

  
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)}/>
        <GenreSelect onChange={setSelectedGenre} genres={allGenres}/>
        </header>
        <div className='body'>
          {loading ? <CircularProgress size={100}/> : 
            error ? <ErrorMensage mensage={error}/> : <GameList games={filteredGames}/>
          }
          
        </div>
    </div>
  );
}

export default App;
