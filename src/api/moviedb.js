import { apiDomain, apiKey } from './env';

const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + apiKey
}

const axios = require('axios');

const movie = axios.create({
    baseURL: apiDomain,
    headers: headers
});

export default movie;