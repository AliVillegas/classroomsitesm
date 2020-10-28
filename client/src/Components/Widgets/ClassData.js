import React from 'react';
import { Box, Heading, SimpleGrid, Flex, Button } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../constants'
import { Link } from 'react-router-dom';

const ClassData = ({user, classR, handleChange}) => {

    const handleDeleteClick = () => {
        axios.post(BaseUrl + `/adminDep/deleteClass/${classR.classId}`, '', { withCredentials: true })
        .then(response => {
            //console.log(response)
            handleChange(classR);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <SimpleGrid columns={4} border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
            <Box>
                <Heading bg="blue.300" color="white" p={1} size="sm">{classR.course}</Heading>
            </Box>
            <Box>{classR.name}</Box>
            <Box>{classR.building}</Box>
            <Flex justifyContent="space-evenly" alignItems="center">
                <Button size="xs" variantColor="green" onClick={handleDeleteClick}>
                    <Link to={`/info_class/${classR.classId}`}>
                            Schedule
                    </Link>
                </Button>
                {(user.role === 'admin' || user.role === 'adminDep') ? (
                    <>
                    <Button size="xs" variantColor="red" onClick={handleDeleteClick}>
                        Delete
                    </Button>
                    <Button size="xs" variantColor="blue">
                        <Link to={`/update_class/${classR.classId}`}>
                            Update
                        </Link>
                    </Button>
                    </>
                ) : (
                    <></>
                )}
            </Flex>
        </SimpleGrid>
    );
}

export default ClassData;