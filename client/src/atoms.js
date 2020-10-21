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


// TESTING

export const AllClassroomsAdminCampus = selector({
    key:'AllClassroomsAdminCampus',
    get: async () => {
        try{
            const response = await axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
            if (response.status === 200) {
                console.log(response.data)
                return { };
            }
            return { authenticated: false, user: {}, error: null };
        }catch(err){
            return{}
        }
    }
})

export const CreateClassroom = selector({
    key:'CreateClassroom',
    get: async () => {
        try{
            const response = await axios.post(BaseUrl + '/adminCampus/createNewClassroom', { name:"R1", capacity:"20", building:"10",features:"AC" }, { withCredentials: true })
            if (response.status === 200) {
                console.log(response.data)
                return { };
            }
            return { authenticated: false, user: {}, error: null };
        }catch(err){
            return{}
        }
    }
})

export const UpdateClassroom = selector({
    key:'UpdateClassroom',
    get: async () => {
        try{
            const response = await 
            axios.post(BaseUrl + '/adminCampus/updateClassroom/1', // update/ClassroomId
                { name:"R1", capacity:"20", building:"10",features:"AC" }, 
                { withCredentials: true })

            if (response.status === 200) {
                console.log(response.data)
                return { };
            }
            return { authenticated: false, user: {}, error: null };
        }catch(err){
            return{}
        }
    }
})
