import React from "react";
import { login } from "./api";

export default function Login(props) {
    return (
        <div className='login_page'>

                <h2>Login</h2>
                <input type="text" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <button type="submit" className="submin_button" onClick={login}>Submit</button>

        </div>
    );
}