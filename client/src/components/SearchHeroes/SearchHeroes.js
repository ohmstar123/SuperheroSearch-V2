import React, { useState } from 'react';
import "./SearchHeroes.css";

const SearchHeroes = () => {
  // useStates for the search criteria
    const [name, setName] = useState('');
    const [publisher, setPublisher] = useState('');
    const [race, setRace] = useState('');
    const [power, setPower] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [fetchedData, setFetchedData] = useState(null);
    const [expandedResult, setExpandedResult] = useState(null);

    // Fetching data from the database for all superhero info and powers 
    React.useEffect(() => {
      fetch("/api/superheroes/getInfoAndPowers")
        .then((res) => res.json())
        .then((data) => {
          setFetchedData(data)     
        });
    }, []);
    

    const handleSearch = (resultIndex) => {
        // Gather all the data from the database
        const results = fetchedData;
    
        // Filtering based on search criteria
        const filteredResults = results.filter(hero => {
          const nameMatch = hero.name.toLowerCase().startsWith(name.toLowerCase());
          const publisherMatch = hero.Publisher.toLowerCase().startsWith(publisher.toLowerCase());
          const raceMatch = hero.Race.toLowerCase().startsWith(race.toLowerCase()); 
          let powerMatch = false;
          for (let i = 0; i < hero.Powers.length; i++) {
            if (hero.Powers[i].toLowerCase().startsWith(power.toLowerCase())) {
              powerMatch = true;
              break
            }
          }
    
          return nameMatch && publisherMatch && raceMatch && powerMatch;
        });

        // If the clicked result is already expanded, collapse it
        if (resultIndex === expandedResult) {
          setExpandedResult(null);
        } else {
          // Otherwise, expand the clicked result
          setExpandedResult(resultIndex);
        }
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
                  <li key={index} className='newHero-item' onClick={() => handleSearch(index)}>
                    <div className = 'resultHeader'>
                      <b>Name:</b> {hero.name} <br></br>
                      <b>Publisher:</b> {hero.Publisher}
                    </div>
                    {expandedResult === index && (
                      <div className = 'expandedInfo'>
                        <b>Gender:</b> {hero.Gender} <br></br>
                        <b>Eye Color:</b> {hero['Eye color']} <br></br>
                        <b>Race:</b> {hero.Race} <br></br>
                        <b>Hair Color:</b> {hero['Hair color']} <br></br>
                        <b>Height:</b> {hero.Height} <br></br>
                        <b>Skin color:</b> {hero['Skin color']} <br></br>
                        <b>Alignment:</b> {hero.Alignment} <br></br>
                        <b>Weight:</b> {hero.Weight} <br></br>
                        <b>Powers:</b> {hero.Powers.map((power, index) => (
                          <li key={index} className='power-list-item'>
                            {power}
                          </li>
                        ))}
                        
                      </div>
                    )}
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