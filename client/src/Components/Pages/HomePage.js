import { Stack, Heading } from '@chakra-ui/core';
import React from 'react';
import AdminDashboard from '../Dashboards/AdminDashboard'
import AdminDepDashboard from '../Dashboards/AdminDepDashboard'
import StudentDashboard from '../Dashboards/StudentDashboard'
import ProfessorDashboard from '../Dashboards/ProfessorDashboard'

import Landing from './Landing';

const HomePage = ({authenticated, user}) => {

    const renderUserPage = () => {
        if (user.role === 'admin') {
            return <AdminDashboard authenticated={authenticated} user={user} />
        } else if (user.role === 'adminDep') {
            return <AdminDepDashboard />
        } else if (user.role === 'student') {
            return <StudentDashboard authenticated={authenticated} user={user} />
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
                { renderUserPage() }
            </Stack>} 
        </Stack>
    );
}

export default HomePage;