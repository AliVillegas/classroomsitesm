import { Box, List, ListItem, Heading, Stack, SimpleGrid, Button, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BaseUrl } from '../../../constants';
import axios from 'axios';
import ClasroomData from '../../Widgets/ClassroomData'

const AdminClassrooms = ({ authenticated, user }) => {
    const [classrooms, setClassrooms] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const removeClassroom = (classroom) => {
        const index = classrooms.findIndex(c => classroom.id === c.id);
        let modified = JSON.parse(JSON.stringify(classrooms));
        modified.splice(index, 1);
        setClassrooms(modified);
        setFiltered(modified);

    }

    useEffect(() => {
        axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
            .then((response) => {
                setClassrooms(response.data.classrooms)
                setFiltered(response.data.classrooms)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const handleChangeSearch = (e) => {
        const s = e.target.value;
        setSearch(s)
        const filt = classrooms.filter(c => c.name.toLowerCase().includes(s.toLowerCase()))
        setFiltered(filt)
    }

    const tableHeader = {
        'name': 'Name',
        'building': 'Building',
        'capacity': 'Capacity',
        'features': 'Features'
    }
    const userHeading = () => {
        if (user) {
            if (user.role === 'admin' || user.role === 'adminDep') {
                return "Admin Classrooms";
            }
            return "Classrooms"
        }
    }
    if (user) {
        return (
            <Stack p={10}>
                <Link to='/'>Return to dashboard </Link>
                <Heading mt={5}>{userHeading()}</Heading>
                {(user.role === 'admin') ? (
                    <>
                        <Button mx="auto" variantColor="green" size="md">
                            <Link to="/create_classroom">
                                Create classroom
                    </Link>
                        </Button>
                    </>
                ) : (
                        <></>
                    )}

                <FormControl>
                    <FormLabel htmlFor="search">Search classroom</FormLabel>
                    <Input type="text" id="search" value={search} onChange={handleChangeSearch} />
                </FormControl>
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
                    {filtered.map((classroom) => {
                        return (
                            <ListItem key={"cr-" + classroom.id} >
                                <ClasroomData user={user} classroom={classroom} handleChange={removeClassroom}></ClasroomData>
                            </ListItem>
                        )
                    })}
                </List>

            </Stack>
        )
    } else {
        return <Redirect to="/" />
    }
}

export default AdminClassrooms;