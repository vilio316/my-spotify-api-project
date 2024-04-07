import { useLoaderData } from "react-router-dom";

export default function Profile(){
    let loader_results = useLoaderData();
    console.log(loader_results)

    return(
        <>
        <h2>Your Profile</h2> 
        <a href={'/'}>Home Page</a>
        </>
    )
}