import { useState, useEffect } from "react"

function App() {
  const CLIENT_ID = "afef5d35bda94486a7b3661b54e2cdcb"
  const REDIRECT_URI = "http://127.0.0.1:5173"
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
    let values = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=1`, {
        headers: {
            Authorization:`Bearer ${token}`
         }
    })
    let response = await values.json()
    console.log(response.tracks.items[0].album.images[0].url)
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