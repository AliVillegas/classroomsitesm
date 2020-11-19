const axios = require('axios');
import BaseUrl from '../../constants'

async function getAllClassrooms() {
    const response = await axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
    return response.data;
}

module.exports = getAllClassrooms;