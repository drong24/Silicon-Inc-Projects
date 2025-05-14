
import React from "react";
import { useState, userEffect } from "react";
import { Routes, Route, Link} from 'react-router'
import { TABS } from "./constants";
import './App.css'
import { useEffect } from "react";

export default function Header(props) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        console.log(JSON.parse(storedUser));
    },[loading]);

    return (
        <header>
            <div className="logo-img">
                <img src="https://wizardly-carson-f4d936.netlify.app/static/media/logo.de1a664e.svg" alt="the movie db title logo" />
            </div>
            <ul className="tab_links">
                <li active={props.activeTab === TABS.HOME ? TABS.HOME : undefined} onClick={() => props.onClick(TABS.HOME)}>
                    <Link to="/">HOME</Link>
                </li>
                <li active={props.activeTab === TABS.LIKED ? TABS.LIKED : undefined} onClick={() => props.onClick(TABS.LIKED)}>
                    <Link to="/favorites">LIKED</Link>
                </li>
                <li active={props.activeTab === TABS.RATED ? TABS.RATED : undefined} onClick={() => props.onClick(TABS.RATED)}>
                    <Link to="/rated">RATED</Link>
                </li>
            </ul>
            {user ? 
            (
                <div className="logout_link">
                    <button onClick={handleLogout}>{user.username}</button>
                </div>
            ) : 
            (
                <div className="login_link">
                    <Link to="/login">Login</Link>
                </div>
            )}
        </header>
    );
}