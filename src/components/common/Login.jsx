import React from 'react'

const Login = () => {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
    const scope = 'user-read-private user-read-email';

    return (
        <a
            href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`}
            className="btn btn-spotify"
        >Sign in with Spotify</a>
    )
}

export default Login