import React, { useContext, useEffect, useState } from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SearchBar from './../search-bar';
import GenreSelect from './../genre-select';
import GameList from './../game-list';
import ErrorMensage from './../error';
import CircularProgress from '@mui/material/CircularProgress';
import UserContext from './../../context/UserContext';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './../favoritesScreen/styleFavorite.css'

function FavoritesScreen() {
  const userContext = useContext(UserContext) 
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  const navigate = useNavigate();

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

      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    if (!userContext.isGameFavorite(game.id)) {
      return false; 
    }
  
    if (selectedGenre !== 'all') {
      return (
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        game.genre === selectedGenre
      );
    }
  
    return game.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortGamesByRating = () => {
    console.log(sortOrder)
    const sortedGames = [...games].sort((a, b) => {
      if (sortOrder === 'desc') {
        return userContext.ratings[b.id] - userContext.ratings[a.id];
      } else {
        return userContext.ratings[a.id] - userContext.ratings[b.id];
      }
    });
  
    setGames(sortedGames);
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const logout = async () => {
    try {
      await getAuth().signOut()
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const login = () => {
    navigate("/auth/login")
  }

  const favoritesScreen = () => {
    navigate("/favorites")
  }

  const HomeScreen = () => {
    navigate("/")
  }

  return (
    <div className="App">
      <div className="Header-container">
        <div className="Nav-top">
          <div className="Logo-name">
            <SportsEsportsIcon className="Logo-icon" />
            <h2 className='game-logo'>Game<span className='list-logo'>List</span></h2>
          </div>
          <div>
            <button className='favorites' onClick={HomeScreen}>Home</button>
            <button className='favorites' onClick={favoritesScreen}>Favorites</button>
            {userContext.user ? <button className='logout-button' onClick={logout}>Logout</button> : <button className='login' onClick={login}>Login</button>}
          </div>
        </div>
        <header className="App-header">
          <div className="Nav-bar">
            <SearchBar onChange={(e) => setSearchTerm(e.target.value)}/>
            <GenreSelect onChange={setSelectedGenre} genres={allGenres}/>
            {sortOrder === 'desc' ? <Button onClick={sortGamesByRating} sx={{
                ml: 0.1,
                background: 'none',
                border: '1px solid',
                borderColor: '#17d12f',
                borderRadius: '25px',
                color: '#fff',
                cursor: 'pointer',
                height: '36px',
                padding: '4px 16px',
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#17d12f',
                  color: '#000',
                },
              }}>Order by rating<ArrowUpwardIcon/></Button> : 
              <Button onClick={sortGamesByRating} sx={{
                ml: 0.1,
                background: 'none',
                border: '1px solid',
                borderColor: '#17d12f',
                borderRadius: '25px',
                color: '#fff',
                cursor: 'pointer',
                height: '36px',
                padding: '4px 16px',
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#17d12f',
                  color: '#000',
                },
              }}>Order by rating<ArrowDownwardIcon/></Button>}
          </div> 
        </header>  
        <div className='body'>
        {loading ? <CircularProgress size={100}/> : 
            error ? <ErrorMensage mensage={error}/> : (
              <>
                {userContext.user ? (
                  <GameList games={filteredGames}/>
                ) : (
                  <p className='login-favorites'>Please <span className='login-favorites-link' onClick={login}>login</span> to view favorites</p>
                )}
              </>
            )}
          </div>
        </div>
    </div>
  );
}

export default FavoritesScreen;
