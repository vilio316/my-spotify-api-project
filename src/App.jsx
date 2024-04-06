import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

function App() {
  const CLIENT_ID = "afef5d35bda94486a7b3661b54e2cdcb"
  const REDIRECT_URI = "http://localhost:5173/home"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [artistName, setName] = useState("")
  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  const searchForArtist = async (e) =>{
    e.preventDefault();

    let values = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=5`, {
        headers: {
            Authorization:`Bearer ${token}`
         }
    })
    let oppen = await values.json();
    console.log(oppen)
  }
  return (
      <div className="App">
          <header className="App-header">
              <h1>Spotify React</h1>
              {!token ?
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a>
                  : <>
                  <form onSubmit={searchForArtist}>
            <input type = "text" placeholder="Enter Artist Name" onChange={(e)=> setName(e.target.value)}/>
            <button type="submit">SUBMIT, Fein</button>
          </form>
                  <button onClick={logout}>Logout</button></>}
          </header>
      </div>
  );
}

export default App