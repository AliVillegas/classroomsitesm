import React, { useEffect, useState } from 'react';
import { Heading, Select, FormControl, Stack, FormLabel, Input, Button } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../../constants'
import { Link, Redirect, useParams } from 'react-router-dom';

const UpdateUserRole = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [redirect, setRedirect] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(BaseUrl + `/adminCampus/getUser/${id}`, { withCredentials: true })
            .then(response => {
                console.log(response.data)
                setName(response.data.user.name)
                setEmail(response.data.user.email)
                setRole(response.data.user.role)
            }).catch(err => {
                console.log(err)
            })
    }, [id])

    const handleClick = () => {
        axios.post(BaseUrl + `/adminCampus/updateUserRole/${id}`, // update/ClassroomId
            {
                newRole: role
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
                <Heading mt={5}>Update User Role</Heading>
                <FormControl px={10}>
                    <FormLabel  htmlFor="name">Name</FormLabel>
                    <Input isDisabled id="name" placeholder="User name" value={name} onChange={(e) => { setName(e.target.value) }} />

                    <FormLabel  htmlFor="email">Email</FormLabel>
                    <Input isDisabled id="email" placeholder="User email" value={email} onChange={(e) => { setEmail(e.target.value) }} />

                    <FormLabel isRequired htmlFor="role">Role</FormLabel>
                    <Select placeholder="Select option" onChange={(e) => { setRole(e.target.value) }}>
                        <option selected={role === "admin" ? "selected" :''} value="admin">Admin</option>
                        <option selected={role === "adminDep" ? "selected" :''} value="adminDep">Department Admin</option>
                        <option selected={role === "student" ? "selected" :''}  value="student">Student</option>
                        <option selected={role === "professor" ? "selected" :''} value="professor">Professor</option>
                    </Select>
                    <Button variantColor="blue" size="md" mt={3} onClick={handleClick}>
                        Update User Role
                    </Button>
                </FormControl>
            </Stack>
        )
    } else {
        return <Redirect to={redirect}></Redirect>
    }
}

export default UpdateUserRole;