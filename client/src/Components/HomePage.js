import { Stack, Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession} from '../atoms';
//Import for TESTS to API 
import { AllClassroomsAdminCampus,CreateClassroom, UpdateClassroom, DeleteClassroom,SearchClassroom} from '../atoms';


import Landing from './Landing';

const HomePage = () => {
    const { authenticated, user, } = useRecoilValue(CurrentSession);
    //TESTS
   
    const {testData} = useRecoilValue(AllClassroomsAdminCampus)
    const {createClassRoom} = useRecoilValue(CreateClassroom)
    const {updateClassroom} = useRecoilValue(UpdateClassroom)
    const {deleteClassroom} = useRecoilValue(DeleteClassroom)
    const {searchClassroom} = useRecoilValue(SearchClassroom)
   
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