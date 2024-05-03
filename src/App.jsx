import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { access_token, clearToken, storeToken } from "./store_slices/idSlice"
import { Header } from "./components/Header";
import { SearchProcessor} from "./components/SearchResults";
import logoFile  from "../src/assets/Spotify_Icon_RGB_Black.png"
import { ProfileShort } from "./components/ProfileLoad";
import { useNavigate } from "react-router-dom";


const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
  const codeVerifier  = generateRandomString(64);
  
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
  
  const hashed = async () => {await sha256(codeVerifier)}
  const codeChallenge = base64encode(hashed);


function App() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID ;
  const REDIRECT_URI = window.location.href;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const scopes = 'user-top-read user-read-private user-read-email'
  const CCM= 'S256'
  const RESPONSE_TYPE = "token"
  const [tokenVal, setToken] = useState("")
  const [artistName, setName] = useState("")
  let dispatch = useDispatch();
  let token = useSelector(access_token)

  const navigate = useNavigate();

  const goThere = () => {
    navigate("/user-playlists")
  }




  useEffect(() => {
      const hash = window.location.hash
      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
          window.location.hash = ""
      }
      setToken(token)
      dispatch(storeToken(token))
  }, [])

  const logout = () => {
      setToken("")
      dispatch(storeToken(''))
  }

  return (
      <div className="App">
          <header className="App-header">
              <h1>SongInformer v1.0</h1>
              </header>
             
              {!token ?
              <>
               <div style={{width:'100%', height:'80vh', display:"grid"}}>
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns:" auto auto", 
                  placeSelf:"center",
                  alignContent:"center",
                  alignItems:"center",
                  gap:'0.5rem',
                  borderRadius:"2.5rem", color: 'black', backgroundColor:"green", fontSize:"1.5rem", padding: '0.5rem'
                }}>
                  <img src={logoFile} alt="Spotify Logo"  width="25rem"></img>
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}&code_challenge_method=${CCM}&code_challenge=${codeChallenge}`}>
                    Log In 
                      to Spotify</a>
                      </div>
                      </div>
                
                </>
                  : <>
                  <Header/>
                  <h2>Your User Profile</h2>
                  <div onClick={goThere}>
                    <ProfileShort/>
                  </div>
                  <form>
                  <h2>Search for Anything Here: </h2>
            <input type = "text" placeholder="Enter Search Term" style={{
              outline: "none", border:"2px solid green", borderRadius:"1.25rem", fontSize:"1.5rem", padding: '0.25rem 0.5rem'
              }} onChange={(e)=> {if(e.target.value.length > 0){setName(e.target.value)}}}/>
            <SearchProcessor search={artistName}/>
          </form>
          <p>
          </p>
                  <button style={{outline: "none", borderRadius:"2.5rem", padding: '0.5rem', display:"block", backgroundColor:"green"}} onClick={logout}>Log 
                  Out</button></>}
        
      </div>

  );
}

export default App