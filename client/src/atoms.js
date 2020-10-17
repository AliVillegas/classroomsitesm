import { atom } from 'recoil';

export const AuthenticatedState = atom({
    key: 'authenticatedState',
    default: false
})

export const UserState = atom({
    key: 'userState',
    default: {}
})