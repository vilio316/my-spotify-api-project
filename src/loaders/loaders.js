export async function profileLoader(){
    let token = localStorage.getItem("token");

    let request = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization:`Bearer ${token}`
         }
    })
    let response = await request.json();
    return response
} 