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


// TESTING EXAMPLES 

export const AllClassroomsAdminCampus = selector({
    key: 'AllClassroomsAdminCampus',
    get: async() => {
        try {
            const response = await axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const CreateClassroom = selector({
    key: 'CreateClassroom',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/adminCampus/createNewClassroom', { name: "R1", capacity: "20", building: "10", features: "AC" }, { withCredentials: true })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const UpdateClassroom = selector({
    key: 'UpdateClassroom',
    get: async() => {
        try {
            const response = await
            axios.post(BaseUrl + '/adminCampus/updateClassroom/1', // update/ClassroomId
                { name: "R1", capacity: "20", building: "10", features: "AC" }, { withCredentials: true })

            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const DeleteClassroom = selector({
    key: 'DeleteClassroom',
    get: async() => {
        try {
            const response = await
            axios.post(BaseUrl + '/adminCampus/deleteClassroom/1', // delete/ClassroomId, 
                '', { withCredentials: true })

            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const SearchClassroom = selector({
    key: 'SearchClassroom',
    get: async() => {
        try {
            const response = await
            axios.post(BaseUrl + '/adminCampus/searchClassroom/', // delete/ClassroomId, 
                { searchQuery: "F201" }, { withCredentials: true })

            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})


export const AllUsers = selector({
    key: 'AllUsers',
    get: async() => {
        try {
            const response = await axios.get(BaseUrl + '/adminCampus/allUsers/', { withCredentials: true })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const UpdateUserRole = selector({
    key: 'UpdateUserRole',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/adminCampus/updateUserRole/1',{newRole:'admin'}, { withCredentials: true })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})
export const SearchCourse= selector({
    key: 'SearchCourse',
    get: async() => {
        try {
            const response = await
            axios.post(BaseUrl + '/adminDep/searchCourse/', // delete/ClassroomId, 
                { searchQuery: "Phy" }, { withCredentials: true })

            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})
export const AllCourses = selector({
    key: 'AllCourses',
    get: async() => {
        try {
            const response = await axios.get(BaseUrl + '/adminDep/allCourses', {
                params: {
                limit: 2
                },
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})
export const CreateCourse = selector({
    key: 'CreateCourse',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/adminDep/createCourse/',{name:"Ethics 305",classroom_id:5}, {
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const UpdateCourse = selector({
    key: 'UpdateCourse',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/adminDep/updateCourse/6',{name:"Physics 101",classroom_id:5}, {
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const DeleteCourse = selector({
    key: 'DeleteCourse',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/adminDep/deleteCourse/5','', {
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const AllClasses = selector({
    key: 'AllClasses',
    get: async() => {
        try {
            const response = await axios.get(BaseUrl + '/staff/allClasses', {
                params: {
                limit: 100
                },
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const CreateClass = selector({
    key: 'CreateClass',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/adminDep/createClass/',{course_id:5, timeFromMon:'13:00', timeToMon:'14:30'}, {
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const DeleteClass = selector({
    key: 'DeleteClass',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/adminDep/deleteClass/5','', {
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})

export const SearchClass= selector({
    key: 'SearchClass',
    get: async() => {
        try {
            const response = await
            axios.post(BaseUrl + '/staff/searchClass/', // delete/ClassroomId, 
                { searchQuery: "Phy" }, { withCredentials: true })

            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})


export const ClassroomSchedule = selector({
    key: 'ClassroomSchedule',
    get: async() => {
        try {
            const response = await axios.post(BaseUrl + '/staff/classroomSchedule/6','', {
                withCredentials: true 
            })
            if (response.status === 200) {
                console.log(response.data)
                return {};
            }
            return { authenticated: false, user: {}, error: null };
        } catch (err) {
            return {}
        }
    }
})
