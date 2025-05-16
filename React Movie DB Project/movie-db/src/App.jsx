import { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router'
import Header from './Header'
import Home from './Home';
import MovieDetails from './MovieDetails';
import { TABS } from './constants';
import './App.css'
import Favorites from './Favorites';
import Rated from './Rated';
import Login from './Login';
import { UserContext } from './Context/UserContext';
import { FavoritesContext } from './Context/FavoritesContext';
import { fetchFavorites, fetchRated } from './api';
import { MoviesContext } from './Context/MoviesContext';
import { RatedContext } from './Context/RatedContext';


function App() {

  const [moviesMap, setMoviesMap] = useState({});
  const [favoritesMap, setFavoritesMap] = useState([]);
  const [ratedMap, setRatedMap] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    if (user) {
      fetchFavorites().then((data) => {
          setFavoritesMap(data.results);
      });
      fetchRated().then((data) => {
        setRatedMap(data.results);
      });
      console.log("at app.jsx useEffect");
  }
  },[user]);

  return (
    <MoviesContext.Provider value={{ moviesMap, setMoviesMap }}>
    <FavoritesContext.Provider value={{ favoritesMap, setFavoritesMap }}>
    <RatedContext.Provider value={{ratedMap, setRatedMap}}>
    <UserContext.Provider value={{ user, setUser }}>
      <Header 
      activeTab={activeTab} 
      onClick={handleTabClick}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/rated" element={<Rated />} />
        <Route path="/login" element={<Login />} />
        <Route path="/moviedetails/:movieId" element={<MovieDetails/>}/>
        <Route />
      </Routes>
    </UserContext.Provider>
    </RatedContext.Provider>
    </FavoritesContext.Provider>
    </MoviesContext.Provider>
  );
}

export default App
