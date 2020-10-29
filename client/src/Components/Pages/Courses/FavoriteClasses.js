import { Box, List, ListItem, Heading, Stack, SimpleGrid, Button, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BaseUrl } from '../../../constants';
import axios from 'axios';
import FavClassData from '../../Widgets/FavClassData'

const FavoriteClasses = ({authenticated, user}) => {
    const [classes, setClasses] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {        
        axios.get(BaseUrl + '/staff/allFavorites/', { withCredentials: true })
        .then((response) => {
            console.log(response)
            if (response.data.favorites) {
                setClasses(response.data.favorites)
                setFiltered(response.data.favorites)
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleChangeSearch = (e) => {
        const s = e.target.value;
        setSearch(s)
        const filt = classes.filter(c => c.course.toLowerCase().includes(s.toLowerCase()))
        setFiltered(filt)
    }

    const tableHeader = {
        'course': 'Course',
        'classroom': 'Classroom',
        'building': 'Building',
    }

    if (user) {
        return (
            <Stack p={10}>
                <Link to='/'>Return to dashboard </Link>
                <Heading mt={5}>Favorite Classes</Heading>
                <FormControl>
                    <FormLabel htmlFor="search">Search classes</FormLabel>
                    <Input type="text" id="search" value={search} onChange={handleChangeSearch} />
                </FormControl>
                <SimpleGrid columns={3} border="2px" borderRadius="md" borderColor="gray.600" textAlign="center">
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.course}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.classroom}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.building}</Heading>
                    </Box>
                </SimpleGrid>
                <List mt={1} spacing={1}>
                    { filtered.map((classR) => {
                        return (
                            <ListItem key={"class-"+classR.classId} >
                                <FavClassData user={user} classR={classR}></FavClassData>
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
export default FavoriteClasses;