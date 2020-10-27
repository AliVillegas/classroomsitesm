import React from 'react';
import { Box, List, ListItem, Heading, Stack, SimpleGrid } from '@chakra-ui/core';

const ClassroomData = ({classroom}) => {
    return (
        <SimpleGrid columns={4} border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
            <Box>
                <Heading bg="blue.400" color="white" p={1} size="sm">{classroom.name}</Heading>
            </Box>
            <Box>{classroom.building}</Box>
            <Box>{classroom.capacity}</Box>
            <Box>{classroom.features}</Box>
        </SimpleGrid>
    );
}

export default ClassroomData;