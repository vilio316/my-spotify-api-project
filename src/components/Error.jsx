export function Error(){
    return(
        <>
        <h2>SongInformer, with Spotify</h2>
        <p>Oops!</p>
        <p>We've run into an error. Your access token may have expired or your internet may have hit a bad spot. Click <a href={`/`} style={{
            textDecoration:"underline"
        }}>here</a> to go back to the home page, or click the button below to log out and reset your session.</p>
        </>
    )
}