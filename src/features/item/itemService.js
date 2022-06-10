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


const itemService = {
    getTop
}

export default itemService;