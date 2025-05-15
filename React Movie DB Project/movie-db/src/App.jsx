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
import { fetchFavorites } from './api';


function App() {

  const [favoritesMap, setFavoritestMap] = useState([]);
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
          setFavoritestMap(data.results);
      });
      console.log("at app.jsx useEffect");
  }
  },[]);

  return (
    <FavoritesContext.Provider value={{ favoritesMap, setFavoritestMap }}>
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
    </FavoritesContext.Provider>
  );
}

export default App
