import { Box } from '@chakra-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminUsers = ({authenticated, user}) => {
    if (user.role === 'admin') {
        return (
            <Box>Admin Users</Box>
        )
    } else {
        return <Redirect to="/" />
    }
}

export default AdminUsers;