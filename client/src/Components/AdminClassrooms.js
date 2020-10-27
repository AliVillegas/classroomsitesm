import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminClassrooms = ({authenticated, user}) => {
    if (user.role == 'admin') {
        return (
            <Box>Admin AdminClassrooms</Box>
        )
    } else {
        return <Redirect to="/" />
    }
}

export default AdminClassrooms;