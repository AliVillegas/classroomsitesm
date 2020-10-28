import { Box, List, ListItem, Heading, Stack, SimpleGrid } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BaseUrl } from '../../../constants';
import axios from 'axios';
import UserData from '../../Widgets/UserData'

const AdminUsers = ({authenticated, user}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(BaseUrl + '/adminCampus/allUsers', { withCredentials: true })
        .then((response) => {
            console.log(response.data.users)
            setUsers(response.data.users)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const tableHeader = {
        'name': 'Name',
        'email': 'email',
        'role': 'role',
        'edit':'edit'
    }

    if (user && user.role === 'admin') {
        return (
            <Stack p={10}>
                <Link to='/'>Return to dashboard </Link>
                <Heading mt={5}>Admin Users</Heading>
                <SimpleGrid columns={4} border="2px" borderRadius="md" borderColor="gray.600" textAlign="center">
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.name}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.email}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.role}</Heading>
                    </Box>
                    <Box>
                    </Box>
                </SimpleGrid>
                <List mt={1} spacing={1}>
                    { users.map((user) => {
                        return (
                            
                            <ListItem key={"user-"+user.id} >
                                <UserData userD={user} ></UserData>
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

export default AdminUsers;