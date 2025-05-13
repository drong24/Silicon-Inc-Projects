import { useState } from 'react'
import { Routes, Route, Link} from 'react-router'
import Header from './Header'
import Home from './Home';
import MovieDetails from './MovieDetails';
import { TABS } from './constants';
import './App.css'

function App() {

  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }
  return (
    <div>
      <Header 
      activeTab={activeTab} 
      onClick={handleTabClick}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails/:movieId" element={<MovieDetails/>}/>
        <Route />
      </Routes>
    </div>
  );
}

export default App
