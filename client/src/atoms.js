import { selector } from 'recoil';
import axios from 'axios';
import { BaseUrl } from './constants';

export const CurrentSession = selector({
    key: 'CurrentSession',
    get: async() => {
        try {
            const response = await axios.get(BaseUrl + '/auth/office365/success', { withCredentials: true })
            if (response.status === 200) {
                console.log(response.data)
                return { authenticated: true, user: response.data.user, error: null };
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return { authenticated: false, user: {}, error: err };
        }
    },
});