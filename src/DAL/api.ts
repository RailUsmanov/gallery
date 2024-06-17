import axios, {AxiosInstance} from 'axios';

const API_URL = 'https://test-front.framework.team';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;