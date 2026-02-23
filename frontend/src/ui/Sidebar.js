/*
File Name: Sidebar.js
Date Created: 02/05/2026
Date Modified: 02/05/2026
Author: William Fox
Description:

 */



// src/ui/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Item({ to, children }) {
    return (
        <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) => `navItem${isActive ? ' active' : ''}`}
        >
            {children}
        </NavLink>
    );
}

export function Sidebar() {
    const auth = useAuth();

    return (
        <div>
            <div className="navGroupTitle">Main</div>
            <Item to="/">Home</Item>
            <Item to="/dashboard">Dashboard</Item>
            <Item to="/applications">Applications</Item>
            <Item to="/scraping">Scrape</Item>
            <Item to="/projects">Project</Item>
            <Item to="/ai">AI</Item>

            <div className="navGroupTitle">Account</div>
            <button className="button secondary" type="button" onClick={auth.logout} style={{ width: '100%' }}>
                Logout
            </button>
        </div>
    );
}
