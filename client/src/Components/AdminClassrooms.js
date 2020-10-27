import { Box, List, ListItem, Heading, Stack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BaseUrl } from '../constants';
import axios from 'axios';
import ClasroomData from './ClassroomData'

const AdminClassrooms = ({authenticated, user}) => {
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
        .then((response) => {
            console.log(response.data)
            setClassrooms(response.data.classrooms)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    if (user && user.role === 'admin') {
        return (
            <Stack p={10}>
                <Link to='/'>Dashboard</Link>
                <Heading>Admin Classrooms</Heading>
                <List mt={10} spacing={3}>
                    { classrooms.map((classroom) => {
                        return (
                            <ListItem key={"cr-"+classroom.id} >
                                <ClasroomData classroom={classroom}></ClasroomData>
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