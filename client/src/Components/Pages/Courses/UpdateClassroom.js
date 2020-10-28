import React, { useEffect, useState } from 'react';
import { Heading, FormControl, Stack, FormLabel, Input, Button } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../../constants'
import { Link, Redirect, useParams } from 'react-router-dom';

const UpdateClassroom = () => {
    const [name, setName] = useState("");
    const [building, setBuilding] = useState("");
    const [capacity, setCapacity] = useState("");
    const [features, setFeatures] = useState("");
    const [redirect, setRedirect] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(BaseUrl + `/adminCampus/getClassroom/${id}`, { withCredentials: true })
            .then(response => {
                setName(response.data.classroom.name)
                setBuilding(response.data.classroom.building)
                setCapacity(response.data.classroom.capacity)
                setFeatures(response.data.classroom.features)
            }).catch(err => {
                console.log(err)
            })
    }, [id])

    const handleClick = () => {
        axios.post(BaseUrl + `/adminCampus/updateClassroom/${id}`, // update/ClassroomId
            {
                name: name,
                capacity: capacity,
                building: building,
                features: features
            },
            { withCredentials: true })
            .then(response => {
                setRedirect("/admin_classrooms")
            }).catch(err => {
                console.log(err)
            })
    }

    if (redirect === "") {
        return (
            <Stack p={10}>
                <Link to='/'>Return to dashboard </Link>
                <Heading mt={5}>Update Classroom</Heading>
                <FormControl px={10}>
                    <FormLabel isRequired htmlFor="name">Name</FormLabel>
                    <Input isRequired id="name" placeholder="Classroom name" value={name} onChange={(e) => { setName(e.target.value) }} />

                    <FormLabel isRequired htmlFor="building">Building</FormLabel>
                    <Input isRequired id="building" placeholder="Classroom Building" value={building} onChange={(e) => { setBuilding(e.target.value) }} />

                    <FormLabel isRequired htmlFor="capacity">Capacity</FormLabel>
                    <Input isRequired id="capacity" placeholder="Classroom Capacity" value={capacity} onChange={(e) => { setCapacity(e.target.value) }} />

                    <FormLabel htmlFor="features">Features</FormLabel>
                    <Input id="features" placeholder="Classroom Features" value={features} onChange={(e) => { setFeatures(e.target.value) }} />

                    <Button variantColor="blue" size="md" mt={3} onClick={handleClick}>
                        Update
                    </Button>
                </FormControl>
            </Stack>
        )
    } else {
        return <Redirect to={redirect}></Redirect>
    }
}

export default UpdateClassroom;