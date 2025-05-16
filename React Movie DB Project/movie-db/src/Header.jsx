
import React from "react";
import { useEffect, useContext } from "react";
import { Link} from 'react-router'
import { TABS } from "./constants";
import { useUser } from "./Context/UserContext";
import { FavoritesContext } from "./Context/FavoritesContext";
import { RatedContext } from "./Context/RatedContext";

export default function Header(props) {

    const { user, setUser } = useUser();
    const { setFavoritesMap } = useContext(FavoritesContext);
    const { setRatedMap } = useContext(RatedContext);

    const handleLogout = () => {
        console.log("logged out!")
        localStorage.removeItem('user');
        setUser(null);
        setFavoritesMap([]);
        setRatedMap([]);
        window.location.reload();
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
                    <Link to="/favorites">FAVORITE</Link>
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