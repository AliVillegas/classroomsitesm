import React from 'react';
import { Box, Heading, SimpleGrid, Flex, Button } from '@chakra-ui/core';


const FavClassData = ({user, classR, handleChange}) => {
    return (
        <SimpleGrid columns={3} border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
            <Box>
                <Heading bg="blue.300" color="white" p={1} size="sm">{classR.course}</Heading>
            </Box>
            <Box>{classR.name}</Box>
            <Box>{classR.building}</Box>
        </SimpleGrid>
    );
}

export default FavClassData;