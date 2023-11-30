import React, { useState } from 'react';
import "./SearchHeroes.css";

const SearchHeroes = () => {
    const [name, setName] = useState('');
    const [publisher, setPublisher] = useState('');
    const [race, setRace] = useState('');
    const [power, setPower] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // Simulating search logic - replace with actual search functionality
        const results = [
          { name: 'Hulk', publisher: 'Marvel', race: 'Human', power: 'Super Strength' },
          { name: 'Superman', publisher: 'DC Comics', race: 'Alien', power: 'Super Speed' },
          // Add more results as needed
        ];
    
        // Filtering based on search criteria
        const filteredResults = results.filter(hero => {
          const nameMatch = hero.name.toLowerCase().startsWith(name.toLowerCase());
          const publisherMatch = hero.publisher.toLowerCase().startsWith(publisher.toLowerCase());
          const raceMatch = hero.race.toLowerCase().startsWith(race.toLowerCase()); 
          const powerMatch = hero.power.toLowerCase().startsWith(power.toLowerCase());
    
          return nameMatch && publisherMatch && raceMatch && powerMatch;
        });
    
        setSearchResults(filteredResults);
    };

    return (
        <div>
          <h2>Search Heroes</h2>
          <form>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
              Publisher:
              <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
            </label>
            <br />
            <label>
              Race:
              <input type="text" value={race} onChange={(e) => setRace(e.target.value)} />
            </label>
            <br />
            <label>
              Power:
              <input type="text" value={power} onChange={(e) => setPower(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
          </form>
    
          <div>
            <h3>Search Results:</h3>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((hero, index) => (
                  <li key={index}>
                    Name: {hero.name}, Publisher: {hero.publisher}, Race: {hero.race}, Power: {hero.power}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No matching heroes found.</p>
            )}
          </div>
        </div>
      );

};

export default SearchHeroes;