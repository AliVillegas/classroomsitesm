import { Box, List, ListItem, Heading, Stack, SimpleGrid, Button } from '@chakra-ui/core';
import React, { useEffect, useState, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BaseUrl } from '../../../constants';
import axios from 'axios';
import ClassData from '../../Widgets/ClassData'

const ClassInfo = ({ authenticated, user }) => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
     
    })

    if (user && user.role === 'admin') {
        return (
            <Box>
                pene
            </Box>)
    }
    else {
        return <Redirect to="/" />
    }
}
export default ClassInfo;