import React from 'react';
import { Box, Heading, SimpleGrid, Flex, Button } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../constants'
import { Link } from 'react-router-dom';

const ClassroomData = ({classroom, handleChange}) => {

    const handleDeleteClick = () => {
        axios.post(BaseUrl + `/adminCampus/deleteClassroom/${classroom.id}`, '', { withCredentials: true })
        .then(response => {
            handleChange(classroom);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <SimpleGrid columns={5} border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
            <Box>
                <Heading bg="blue.300" color="white" p={1} size="sm">{classroom.name}</Heading>
            </Box>
            <Box>{classroom.building}</Box>
            <Box>{classroom.capacity}</Box>
            <Box>{classroom.features}</Box>
            <Flex justifyContent="space-evenly" alignItems="center">
            <Button size="xs" variantColor="green" >
                    <Link to={`/info_class/${classroom.id}`}>
                            Schedule
                    </Link>
                </Button>
                <Button size="xs" variantColor="red" onClick={handleDeleteClick}>
                    Delete
                </Button>
                <Button size="xs" variantColor="blue">
                    <Link to={`/update_classroom/${classroom.id}`}>
                        Update
                    </Link>
                </Button>
            </Flex>
        </SimpleGrid>
    );
}

export default ClassroomData;