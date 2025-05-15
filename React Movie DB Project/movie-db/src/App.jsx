import { useState, createContext, useContext } from 'react'
import { Routes, Route, Link} from 'react-router'
import Header from './Header'
import Home from './Home';
import MovieDetails from './MovieDetails';
import { TABS } from './constants';
import './App.css'
import Favorites from './Favorites';
import Rated from './Rated';
import Login from './Login';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }
  return (

    <UserContext.Provider value={{user, setUser}}>
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
  );
}

export default App
export const useUser = () => useContext(UserContext);
