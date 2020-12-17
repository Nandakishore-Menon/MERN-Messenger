import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`||"http://localhost:9000"
})

export default instance;