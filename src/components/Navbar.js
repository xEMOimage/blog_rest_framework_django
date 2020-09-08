import React from 'react';
import {NavLink} from 'react-router-dom';

const navbar = () =>(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" to="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
            <li className="nav-item active">
                <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact to="/blog">Blog</NavLink>
            </li>
            </ul>
        </div>
    </nav>
);

export default navbar;