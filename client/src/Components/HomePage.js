import { Stack, Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession} from '../atoms';
import AdminDashboard from './AdminDashboard'
import AdminDepDashboard from './AdminDepDashboard'
import StudentDashboard from './StudentDashboard'
import ProfessorDashboard from './ProfessorDashboard'

import Landing from './Landing';

const HomePage = ({authenticated, user}) => {

    const RenderUserPage = () => {
        if (user.role === 'admin') {
            return <AdminDashboard authenticated={authenticated} user={user} />
        } else if (user.role === 'adminDep') {
            return <AdminDepDashboard />
        } else if (user.role === 'student') {
            return <StudentDashboard />
        } else if (user.role === 'professor') {
            return <ProfessorDashboard />
        }
        return <></>
    }

   
    return(
        <Stack p={4}>
            {!authenticated ? (
                <Landing></Landing>
            ) : 
            <Stack>
                <Heading>Welcome {user.name}</Heading>
                <RenderUserPage />
            </Stack>} 
        </Stack>
    );
}

export default HomePage;