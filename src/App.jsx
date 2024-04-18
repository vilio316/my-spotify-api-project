import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { storeToken } from "./store_slices/idSlice"
import { Header } from "./components/Header";
import { SearchProcessor} from "./components/SearchResults";

function App() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID ;
  const REDIRECT_URI = window.location.href;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const [token, setToken] = useState("")
  const [artistName, setName] = useState("")
  let dispatch = useDispatch()
  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }
      
      setToken(token)
      dispatch(storeToken(token))

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  return (
      <div className="App">
          <header className="App-header">
              <h1>SongInformer v1.0</h1>
              <Header/>
              </header>
             
              {!token ?
              <>
               <div style={{width:'100%', height:'80vh', display:"grid"}}>
                  <a style={{borderRadius:"1.5rem", color: 'black', backgroundColor:"green", fontSize:"1.5rem", placeSelf:"center", padding: '0.5rem'}} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a>
                      </div>
                </>
                  : <>
                  <form>
            <input type = "text" placeholder="Enter Search Term" style={{outline: "none", border:"2px solid green", borderRadius:"1.25rem", fontSize:"1.5rem", padding: '0.25rem 0.5rem'}} onChange={(e)=> {if(e.target.value.length > 0){setName(e.target.value)}}}/>
            <SearchProcessor search={artistName}/>
          </form>
          <a href="/user-playlists">Click Me!</a>
                  <button style={{outline: "none", borderRadius:"1rem", padding: '0.5rem', display:"block"}} onClick={logout}>Log Out</button></>}
      </div>
  );
}

export default App