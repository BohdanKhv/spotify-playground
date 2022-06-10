import axios from "axios";

const API_URL = "https://api.spotify.com/v1/";

const getProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const res = await axios.get(`${API_URL}me`, config);
    return res.data;
}

const userService = {
    getProfile
}

export default userService;