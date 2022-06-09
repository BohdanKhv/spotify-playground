import axios from "axios";

const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_CLIENT_SECRET
const redirect_uri = process.env.REACT_APP_REDIRECT_URI

const API_URL = "https://api.spotify.com/v1/";

const getProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    console.log(token)

    const res = await axios.get(`${API_URL}me`, config);
    return res.data;
}

const userService = {
    getProfile
}

export default userService;