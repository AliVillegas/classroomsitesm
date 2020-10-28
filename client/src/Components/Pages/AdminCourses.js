import { Box } from '@chakra-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminCourses = ({authenticated, user}) => {
    if (user.role === 'adminDep') {
        return (
            <Box>Admin Courses</Box>
        )
    } else {
        return <Redirect to="/" />
    }
}

export default AdminCourses;