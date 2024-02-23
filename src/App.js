import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


// 1. enter character name
// 2. fetch char from api
// 3. save it in state
// 4. display the details in card
function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState({})

  const searchChar = async () => {
    if(!query) return

    setBio({})
    setLoading(true)
    try {
      const res = await fetch("https://narutodb.xyz/api/character/search?name=" + query, {
        headers: {
          'accept': 'application/json'
        }
      })

      const data = await res?.json()

      console.log(data)
      setBio(data)
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App container">
      <h1 style={{color: '#fff'}}>Naruto Cards</h1>
      <input
        type="search"
        name="search"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchChar} disabled={loading} aria-busy={loading ? "true" : "false"}>Search</button>
      
      {loading ? 
        <progress />
      : ''}

      {bio?.name?.length > 0 ? 
        <article style={{width: '60%', margin: '20px auto', height: '60vh', overflow: 'auto'}}>
          <img src={bio?.images[0]} alt={bio?.name} width={300}/>
          <h2>{bio?.name}</h2>

          <p>Clan: {bio?.personal?.clan}</p>
          <p>Birthdate: {bio?.personal?.birthdate}</p>
          <p>Sex: {bio?.personal?.sex}</p>
          {/* <p>Age: {bio?.personal?.age}</p> */}

          <p>Blood Type: {bio?.personal?.bloodType}</p>

          <div>
            <h2>Voice Actor</h2>
              <p>Japanese: {bio?.voiceActors?.japanese}</p>
          </div>

          <div>
            <h2>Chakra Types</h2>
            <ol>
              {bio?.natureType?.map((chakra, idx) => (
                <li key={idx}>{chakra}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2>Occupation</h2>
            <ol>
              {bio?.personal?.occupation?.map((o, idx) => (
                <li key={idx}>{o}</li>
              ))}
            </ol>
          </div>

           <div>
            <h2>Affiliation</h2>
            <ol>
              {bio?.personal?.affiliation?.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2>Teams</h2>
            <ol>
              {bio?.personal?.team?.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ol>
          </div>
          
          <div>
            <h2>Tools</h2>
            <ol>
              {bio?.tools?.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ol>
          </div>
          <div>
            <h2>Jutsus</h2>
            <ol>
              {bio?.jutsu?.map((jutsu, idx) => (
                <li key={idx}>{jutsu}</li>
              ))}
            </ol>
          </div>
        </article>        
      : ''}

    </div>
  );
}

export default App;
