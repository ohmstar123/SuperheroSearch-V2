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
    
    // Fuzzy search function to allow for soft searching
    const fuzzySearch = (query, target) => {
      const queryNoSpaces = query.replace(/\s/g, '')
      const targetNoSpaces = target.replace(/\s/g, '')

      const queryLower = queryNoSpaces.toLowerCase()
      const targetLower = targetNoSpaces.toLowerCase()

      // If the query is longer than the target, it can't be a match
      let mismatchCount = 0;
      for (let i = 0; i < queryLower.length; i++) {
        if (queryLower[i] !== targetLower[i]) {
          mismatchCount++

          if (mismatchCount > 2) {
            return false;
          }
        } 
      }
      return true
    }

    // Function to handle the search
    const handleSearch = (resultIndex) => {
        // Gather all the data from the database
        const results = fetchedData;
    
        // Filtering based on search criteria
        const filteredResults = results.filter(hero => {
          const nameMatch = fuzzySearch(name, hero.name)
          const publisherMatch = fuzzySearch(publisher, hero.Publisher)
          const raceMatch = fuzzySearch(race, hero.Race)
          const powerMatch = hero.Powers.some((heroPower) => fuzzySearch(power, heroPower))
    
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

    // Function to handle the search on DuckDuckGo
    const handleDDGSearch = (name, publisher) => {
      const searchQuery = `${name} ${publisher}`;
      const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`
      window.open(searchUrl, '_blank')
    }

    // jsx for the search page
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
                        <button onClick={() => handleDDGSearch(hero.name, hero.Publisher)}>
                          Search for {hero.name} on DuckDuckGo
                        </button>
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

// exporting the search page
export default SearchHeroes;