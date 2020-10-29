import { Box, List, ListItem, Heading, Stack, SimpleGrid, Button } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BaseUrl } from '../../../constants';
import axios from 'axios';
import ClasroomData from '../../Widgets/ClassroomData'

const AdminClassrooms = ({authenticated, user}) => {
    const [classrooms, setClassrooms] = useState([]);

    const removeClassroom = (classroom) => {
        const index = classrooms.findIndex(c => classroom.id === c.id);
        let modified = JSON.parse(JSON.stringify(classrooms));
        modified.splice(index, 1);
        setClassrooms(modified);
    }

    useEffect(() => {

        axios.post(BaseUrl + '/adminCampus/searchClassroom/', // delete/ClassroomId, 
        { searchQuery: "R1" }, { withCredentials: true }).then((response) =>{
            console.log(response.data)
        })
        axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
        .then((response) => {
            // console.log(response.data)
            setClassrooms(response.data.classrooms)
        }).catch(err => {
            console.log(err);
        })
    },[])

    const tableHeader = {
        'name': 'Name',
        'building': 'Building',
        'capacity': 'Capacity',
        'features': 'Features'
    }

    if (user && user.role === 'admin') {
        return (
            <Stack p={10}>
                <Link to='/'>Return to dashboard </Link>
                <Heading mt={5}>Admin Classrooms</Heading>
                <Button mx="auto" variantColor="green" size="md">
                    <Link to="/create_classroom">
                        Create classroom
                    </Link>
                </Button>
                <SimpleGrid columns={5} border="2px" borderRadius="md" borderColor="gray.600" textAlign="center">
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.name}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.building}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.capacity}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.features}</Heading>
                    </Box>
                </SimpleGrid>
                <List mt={1} spacing={1}>
                    { classrooms.map((classroom) => {
                        return (
                            <ListItem key={"cr-"+classroom.id} >
                                <ClasroomData classroom={classroom} handleChange={removeClassroom}></ClasroomData>
                            </ListItem>
                        )
                    }) }
                </List>
                
            </Stack>
        )
    } else {
        return <Redirect to="/" />
    }
}

export default AdminClassrooms;