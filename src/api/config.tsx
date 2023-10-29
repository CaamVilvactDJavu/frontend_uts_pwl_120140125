import httpService from 'axios';

const SERVER_URL = "http://localhost:5173/";

const apiClient = httpService.create({
    baseURL: SERVER_URL
});

export { apiClient };
