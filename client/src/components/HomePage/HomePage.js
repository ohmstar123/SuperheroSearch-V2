import React from 'react';
import "./HomePage.css";
import SearchHeroes from '../SearchHeroes/SearchHeroes';
import Login from '../Login/Login';

const HomePage = () => {
    return(
        <div>
            <h1>Ohm's Superhero Page</h1>
            <p>Welcome to my page, this is an environment where you can gather your favourite superheroes, put them in a list, and show them to others</p>
            <Login />
            <SearchHeroes />
        </div>
    )
};

export default HomePage;