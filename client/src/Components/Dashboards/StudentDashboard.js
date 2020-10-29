import { Box } from '@chakra-ui/core';
import React from 'react';
import AdminClasses from '../Pages/Courses/AdminClasses';

const StudentDashboard = ({authenticated, user}) => {
    return (
        <AdminClasses authenticated={authenticated} user={user} ></AdminClasses>
    );
}

export default StudentDashboard;