import React, { useState } from 'react';
import { Heading, FormControl, Stack, FormLabel, Input, Button } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../../constants'
import { Link, Redirect } from 'react-router-dom';

const CreateClassroom = ({ authenticated, user }) => {

    const [name, setName] = useState("");
    const [building, setBuilding] = useState("");
    const [capacity, setCapacity] = useState("");
    const [features, setFeatures] = useState("");
    const [redirect, setRedirect] = useState("");

    const handleClick = () => {
        axios.post(BaseUrl + '/adminCampus/createNewClassroom',
            {
                name: name,
                capacity: capacity,
                building: building,
                features: features
            }, { withCredentials: true })
            .then(response => {
                setRedirect("/admin_classrooms")
            }).catch(err => {
                console.log(err)
            })
    }

    if (user && user.role === 'admin') {
        if (redirect === "") {
            return (
                <Stack p={10}>
                    <Link to='/'>Return to dashboard </Link>
                    <Heading mt={5}>Create Classroom</Heading>
                    <FormControl px={10}>
                        <FormLabel isRequired htmlFor="name">Name</FormLabel>
                        <Input isRequired id="name" placeholder="Classroom name" onChange={(e) => {setName(e.target.value)}}/>
    
                        <FormLabel isRequired htmlFor="building">Building</FormLabel>
                        <Input isRequired id="building" placeholder="Classroom Building" onChange={(e) => {setBuilding(e.target.value)}}/>
    
                        <FormLabel isRequired htmlFor="capacity">Capacity</FormLabel>
                        <Input isRequired id="capacity" placeholder="Classroom Capacity" onChange={(e) => {setCapacity(e.target.value)}}/>
    
                        <FormLabel htmlFor="features">Features</FormLabel>
                        <Input id="features" placeholder="Classroom Features" onChange={(e) => {setFeatures(e.target.value)}}/>
    
                        <Button variantColor="blue" size="md" mt={3} onClick={handleClick}>
                            Create
                        </Button>
                    </FormControl>
                </Stack>
            )
        } else {
            return <Redirect to={redirect}></Redirect>
        }
    } else {
        return <Redirect to="/"></Redirect>
    }

}

export default CreateClassroom;