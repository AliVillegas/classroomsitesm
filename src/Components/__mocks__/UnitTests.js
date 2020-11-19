import axios from 'axios';
import { BaseUrl } from '../../constants';


export const API = BaseUrl;

export const fetchClassroomData = async () => {
    const response = await axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
    if (response) {
        if (response.status === 200) {
            return response.data;
        }
    }
    else {
        return "Unauthorized Access"
    }
};

export const CreateClassroom = async () => {
    try {
        const response = await axios.post(BaseUrl + '/adminCampus/createNewClassroom', { name: "R1", capacity: "20", building: "10", features: "AC" }, { withCredentials: true })
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        }
        return "Data"
    } catch (err) {
        return "Fetched Data correctly"

    }
}



export const tests = async () => {
    const adminAccessToClassrooms = await fetchClassroomData()
    const adminCreateClassroom = await CreateClassroom()
    let data = {
        adminAccessToClassrooms: adminAccessToClassrooms,
        adminCreateClassroom: adminCreateClassroom
    }
    return data
}

export default tests;
