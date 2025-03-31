import { useState } from "react";
import { useFindUserQuery } from "../loaders/apiSlice"
import { Link} from "react-router-dom";
import { FaHome, FaUser } from 'react-icons/fa'
import { IoSettingsSharp } from "react-icons/io5";
import { MdPlaylistPlay } from "react-icons/md";

export function Header(){
    const {data} = useFindUserQuery();
    let [state, setState] = useState(false)

    return(
        <>
        {data ? <div style={{position:"relative"}} onMouseEnter={() => setState(true)} onMouseLeave={()=> setState(false)}>
            <p style={{
                fontSize: "1.25rem", 
                color:"black", 
                backgroundColor:"green", 
                padding: "1.25rem", 
                borderRadius:"1.25rem",
                textAlign: "right"
                }}>
        <a>{data.display_name}</a>
        </p>
        {state ?
        <div style={{position: "absolute", width:"12.5rem", right: '0', top: "1.5rem", zIndex:"2", padding:"0.75rem 0.5rem", backgroundColor: 'rgba(0, 205, 0, 0.75)', borderRadius:"1rem" }}>
           
            <div className="header_link_container">
            <FaHome size={'1.5em'}/>
            <a href={'/'} className="header_links"> 
            Home</a>
            </div>
            
            <div className="header_link_container">
            <FaUser size={'1.5em'}/>
            <a href={`/user-profile`} className="header_links">
            Your Profile</a>
            </div>

            <div className="header_link_container">
            <MdPlaylistPlay size={'1.5rem'}/>
            <a href={'/playlists'} className="header_links"> 
            Your Playlists</a>
            </div>

            <div  
            className="header_link_container"
            >
            <IoSettingsSharp size={'1.5em'}/>
            <a href={`/user-profile`} className="header_links">
            Settings</a>
            </div>
        </div>
: <></>}
        </div>: 
        <p><a href="\">Sign In</a></p>
        
        }
        </>
    )
}

