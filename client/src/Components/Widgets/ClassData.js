import React from 'react';
import { Box, Heading, SimpleGrid, Flex, Button } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../constants'
import { Link } from 'react-router-dom';

const ClassData = ({user, classR, handleChange, isFavorite, handleAddFavorite}) => {

    const handleDeleteClick = () => {
        axios.post(BaseUrl + `/adminDep/deleteClass/${classR.classId}`, '', { withCredentials: true })
        .then(response => {
            handleChange(classR);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleFavoriteClick = () => {
        axios.post(BaseUrl + `/staff/favoriteClass/${classR.classId}`, '', { withCredentials: true })
        .then(response => {
            console.log(response)
            handleAddFavorite(classR)
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
                {(user.role === 'student' && !isFavorite) ? (
                    <Button size="xs" variantColor="yellow" onClick={handleFavoriteClick}>
                        Add as favorite
                    </Button>
                ) : (
                    <></>
                )}
                
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