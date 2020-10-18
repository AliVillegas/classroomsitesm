import { atom, selector } from 'recoil';
import axios from 'axios';
import { BaseUrl } from './constants';

export const CurrentSession = selector({
    key: 'CurrentSession',
    get: async() => {
        axios.get(BaseUrl + '/auth/office365/success', { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    return response.data.user;
                }
                return null;
            }).catch(() => {
                return null;
            })
    },
});

export const AuthenticatedState = selector({
    key: 'AuthenticatedState',
    get: async({get }) => {
        const user = get(CurrentSession)
        if (user) {
            return true;
        }
        return false;
    },
});