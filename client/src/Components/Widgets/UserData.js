import React from 'react';
import { Box, Heading, SimpleGrid, Flex, Button } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../constants'
import { Link } from 'react-router-dom';

const UserData = ({userD, handleChange}) => {


    return (
        <SimpleGrid columns={4} border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
            <Box>
                <Heading bg="blue.300" color="white" p={1} size="sm">{userD.name}</Heading>
            </Box>
            <Box>{userD.email}</Box>
            <Box>{userD.role}</Box>
            <Flex justifyContent="space-evenly" alignItems="center">
                <Button size="xs" variantColor="blue">
                    <Link to={`/update_user/${userD.id}`}>
                        Update role
                    </Link>
                </Button>
            </Flex>
        </SimpleGrid>
    );
}

export default UserData;