
import React from "react";
import { Routes, Route, Link} from 'react-router'
import { TABS } from "./constants";
import './App.css'



export default function Header(props) {

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
            <div className="login_link">
                Login
            </div>
        </header>
    );
}