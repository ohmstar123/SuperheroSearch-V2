import React from 'react';
import "./HomePage.css";
import SearchHeroes from '../SearchHeroes/SearchHeroes';
import Login from '../Login/Login';
import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'

const HomePage = () => {
    return(
        <div>
            <h1>Ohm's Superhero Page</h1>
            <p>Welcome to my page, this is an environment where you can gather your favourite superheroes, put them in a list, and show them to others</p>
            {/* <Login /> */}
            <SignIn />
            <SignUp />
            <SearchHeroes />
        </div>
    )
};

export default HomePage;