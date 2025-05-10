import { useState } from 'react'
import { Routes, Route, Link} from 'react-router'
import Header from './Header'
import Home from './Home';
import { TABS } from './constants';
import './App.css'

function App() {

  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const handleTabClick = (tab) => {
    console.log(tab);
    setActiveTab(tab);
    console.log(activeTab);
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App
