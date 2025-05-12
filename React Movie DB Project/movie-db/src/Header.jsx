
import React from "react";
import { Routes, Route, Link} from 'react-router'
import { TABS } from "./constants";
import './App.css'



export default function Header(props) {

    return (
        <header>
            <div className="logo-img">
                <img src="./public/logo.svg" alt="the movie db title logo" />
            </div>
            <ul>
                <li active={props.activeTab === TABS.HOME ? TABS.HOME : undefined} onClick={() => props.onClick(TABS.HOME)}>
                    HOME
                </li>
                <li active={props.activeTab === TABS.LIKED ? TABS.LIKED : undefined} onClick={() => props.onClick(TABS.LIKED)}>
                    LIKED
                </li>
                <li active={props.activeTab === TABS.RATED ? TABS.RATED : undefined} onClick={() => props.onClick(TABS.RATED)}>
                    RATED
                </li>
            </ul>
            <div>
                Login
            </div>
        </header>
    );
}