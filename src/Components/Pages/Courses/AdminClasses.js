import { Box, List, ListItem, Heading, Stack, SimpleGrid, Button, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BaseUrl } from '../../../constants';
import axios from 'axios';
import ClassData from '../../Widgets/ClassData'

const AdminClasses = ({authenticated, user}) => {
    const [classes, setClasses] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    
    useEffect(() => {        
        axios.get(BaseUrl + '/staff/allClasses/', { withCredentials: true })
        .then((response) => {
            setClasses(response.data.classes)
            setFiltered(response.data.classes)
        }).catch(err => {
            console.log(err);
        })
        
        axios.get(BaseUrl + '/staff/allFavorites/', { withCredentials: true })
        .then((response) => {
            if (response.data.favorites) {
                setFavorites(response.data.favorites)
            }
        })
    }, [])
    
    const removeClass = (classR) => {
        const index = classes.findIndex(c => classR.classId === c.classId);
        let modified = JSON.parse(JSON.stringify(classes));
        modified.splice(index, 1);
        setClasses(modified);
        setFiltered(modified);
    }
    
    const addFavorite = (classToAdd) => {
        let modified = JSON.parse(JSON.stringify(favorites));
        modified.push(classToAdd);
        setFavorites([...modified]);
    }

    const handleChangeSearch = (e) => {
        const s = e.target.value;
        setSearch(s)
        const filt = classes.filter(c => c.course.toLowerCase().includes(s.toLowerCase()))
        setFiltered(filt)
    }

    const userHeading = () => {
        if (user) {
            if (user.role === 'admin' || user.role === 'adminDep') {
                return "Admin Classes";
            }
            return "Classes"
        }
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
                <Heading mt={5}>{ userHeading() }</Heading>
                {(user.role === 'admin' || user.role === 'adminDep') ? (
                    <Button mx="auto" variantColor="green" size="md">
                        <Link to="/create_class">
                            Create class
                        </Link>
                    </Button>

                ) : (
                    <></>
                )}
                <FormControl>
                <FormLabel htmlFor="search">Search classes</FormLabel>
                    <Input type="text" id="search" value={search} onChange={handleChangeSearch} />
                </FormControl>
                <SimpleGrid columns={4} border="2px" borderRadius="md" borderColor="gray.600" textAlign="center">
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.course}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.classroom}</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">{tableHeader.building}</Heading>
                    </Box>
                    <Box>
                    </Box>
                </SimpleGrid>
                <List mt={1} spacing={1}>
                    { filtered.map((classR) => {
                        const isFavorite = favorites.find(elem => {
                            return (elem.class_id === classR.classId || elem.classId === classR.classId)
                        }) !== undefined;
                        return (
                            <ListItem key={"class-"+classR.classId} >
                                <ClassData 
                                    user={user} 
                                    classR={classR} 
                                    handleChange={removeClass} 
                                    isFavorite={isFavorite}
                                    handleAddFavorite={addFavorite}>
                                    
                                </ClassData>
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
export default AdminClasses;