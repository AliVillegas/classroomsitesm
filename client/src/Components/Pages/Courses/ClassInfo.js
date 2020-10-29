import { Box } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Heading,  Stack,} from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../../constants'
import {List, ListItem, SimpleGrid, Button, FormControl, FormLabel, Input } from '@chakra-ui/core';


const ClassInfo = ({ authenticated, user }) => {
    const [classes, setClasses] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(BaseUrl + `/staff/classroomSchedule/${id}`, { withCredentials: true })
        .then((response) => {
            console.log(response)
            setClasses(response.data.classes)
        }).catch(err => {
            console.log(err);
        });
    }, [])

    if (user) {
        return (
            <>
            <Stack p={10}>
                <Link to='/'>Return to dashboard </Link>
                <Heading mt={5}>Class information</Heading>
            </Stack>
            <List mt={1} spacing={1}>
            { classes.map((classR) => {
                return (
                    <ListItem key={"class-"+classR.classId} >

                    </ListItem>
                )
            }) }
        </List>
        </>
        )
    }
    else {
        return <Redirect to="/" />
    }
}
export default ClassInfo;