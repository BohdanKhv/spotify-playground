import axios from "axios";


const API_URL = 'https://api.spotify.com/v1/me/';


const getTop = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    console.log(data)
    const response = await axios.get(`${API_URL}top/${data.type}?limit=${data.limit}&offset=${data.offset}&time_range=${data.timeRange}`, config);
    return response.data;
}

const playlist = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const aplaylistId = '7IwsTX2xGq3Qcg8BSUaURY';
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${aplaylistId}/tracks`, config);
    return response.data;
}


const itemService = {
    getTop,
    playlist
}

export default itemService;