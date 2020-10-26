import { Stack, Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession} from '../atoms';
//Import for TESTS to API 
import { AllClassroomsAdminCampus,
    CreateClassroom, 
    UpdateClassroom, 
    DeleteClassroom,
    SearchClassroom,
    UpdateUserRole,
    AllCourses,
    UpdateCourse,
    CreateCourse,
    DeleteCourse,
    SearchCourse,
    AllClasses,
    CreateClass,
    DeleteClass,
    SearchClass,
    ClassroomSchedule,
    FavoriteClass,
    AllFavorites,
    AllUsers} from '../atoms';


import Landing from './Landing';

const HomePage = () => {
    const { authenticated, user, } = useRecoilValue(CurrentSession);
    //TESTS
   
    const {testData} = useRecoilValue(AllClassroomsAdminCampus)
    const {createClassRoom} = useRecoilValue(CreateClassroom)
    const {updateClassroom} = useRecoilValue(UpdateClassroom)
    const {deleteClassroom} = useRecoilValue(DeleteClassroom)
    const {searchClassroom} = useRecoilValue(SearchClassroom)
    const {allUsers} = useRecoilValue(AllUsers)
    const {updateUser} = useRecoilValue(UpdateUserRole)
    const {allCourses} = useRecoilValue(AllCourses)
    const {updateCourse} = useRecoilValue(UpdateCourse)
    const {createCourse} = useRecoilValue(CreateCourse)
    const {deleteCourse} = useRecoilValue(DeleteCourse)
    const {searchCourse} = useRecoilValue(SearchCourse)
    const {allClasses} = useRecoilValue(AllClasses)
    const {createClass} = useRecoilValue(CreateClass)
    const {deleteClass} = useRecoilValue(DeleteClass)
    const {searchClass} = useRecoilValue(SearchClass)
    const {classroomSchedule} = useRecoilValue(ClassroomSchedule)
    const {favoriteClass} = useRecoilValue(FavoriteClass)
    const {allFavorites} = useRecoilValue(AllFavorites)

   
    return(
        <Stack p={10}>
            {!authenticated ? (
                <Landing></Landing>
            ) : 
            <Stack>
                <Heading>You have logged in succesfully</Heading>
                <Box>Welcome {user.name}</Box>
            </Stack>} 
        </Stack>
    );
}

export default HomePage;