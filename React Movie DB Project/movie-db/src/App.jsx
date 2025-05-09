import { useState } from 'react'
//import { Routes, Route, Link } from 'react-router'
import Header from './Header'
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
    <>
      <div>
        <div>Movie DB Project</div>
        <Header active={activeTab} onClick={handleTabClick}/>
      </div>
    </>
  )
}

export default App
