import { Stack, Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession} from '../atoms';
//TESTS to API 
import { AllClassroomsAdminCampus,CreateClassroomAdminCampus } from '../atoms';


import Landing from './Landing';

const HomePage = () => {
    const { authenticated, user, } = useRecoilValue(CurrentSession);
    //TESTS
    const {testData} = useRecoilValue(AllClassroomsAdminCampus)
    const {createClassRoom} = useRecoilValue(CreateClassroomAdminCampus)
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