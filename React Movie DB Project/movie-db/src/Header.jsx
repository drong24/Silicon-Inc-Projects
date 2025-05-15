
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link} from 'react-router'
import { TABS } from "./constants";
import { useUser } from "./Context/UserContext";


export default function Header(props) {

    const { user } = useUser();
    const { setUser } = useUser();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    
    useEffect(() => {
        console.log("Header: " + user);
    },[user]);

    return (
        <header>
            <div className="logo-img">
                <img src="/logo.svg" />
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