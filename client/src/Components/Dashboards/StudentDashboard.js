import { Box, SimpleGrid, Heading, Button } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = ({authenticated, user}) => {
    return (
        <SimpleGrid columns={2} spacing={30} mt={10}>
            <Box border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
                <Heading bg="blue.400" color="white" p={3}>View Classes</Heading>
                <Box m={4}>
                    Here you can view and search classes within your campus
                </Box>
                <Button mt={4} mb={3}>
                    <Link to="/admin_courses">
                        Go to
                    </Link>
                </Button>
            </Box>
            <Box border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
                <Heading bg="blue.400" color="white" p={3}>View favorites</Heading>
                <Box m={4}>
                    Here you can view and search your favorite classes
                </Box>
                <Button mt={4} mb={3}>
                    <Link to="/fav_courses">
                        Go to
                    </Link>
                </Button>
            </Box>
            <Box border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
                <Heading bg="blue.400" color="white" p={3}>View Classrooms</Heading>
                <Box m={4}>
                    Here you can view all classrooms in the campus 
                </Box>
                <Button mt={4} mb={3}>
                    <Link to="/admin_classrooms">
                        Go to
                    </Link>
                </Button>
            </Box>
        </SimpleGrid>
    );
}

export default StudentDashboard;