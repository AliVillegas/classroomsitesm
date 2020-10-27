import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/core';
import React from 'react';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom';
import AdminClassrooms from './AdminClassrooms';

const AdminDashboard = ({authenticated, user}) => {

    return (
        <SimpleGrid columns={2} spacing={30} mt={10}>
            <Box border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
                <Heading bg="blue.400" color="white" p={3}>Manage Classrooms</Heading>
                <Box m={4}>
                    Here you can create and edit the classrooms from your campus
                </Box>
                <Button mt={4} mb={3}>
                    <Link to="/admin">
                        Go to
                    </Link>
                </Button>
            </Box>
            <Box border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
                <Heading bg="blue.400" color="white" p={3}>Manage Users</Heading>
                <Box m={4}>
                    Here you can manage users within your campus
                </Box>
                <Button mt={4} mb={3}>
                    Go to
                </Button>
            </Box>
        </SimpleGrid>
        
    )
}

export default AdminDashboard;