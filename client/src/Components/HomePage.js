import { Stack, Box, Heading } from '@chakra-ui/core';
import React, {useEffect, useState} from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession } from '../atoms';

import Header from './Header';

const HomePage = () => {
    const { authenticated, user, error } = useRecoilValue(CurrentSession);

    return(
        <Stack p={10}>
            <Header></Header>
            {!authenticated ? (
                <Box>Inicia sesion por favor</Box>
            ) : 
            <Stack>
                <Heading>You have logged in succesfully</Heading>
                <Box>Welcome {user.name}</Box>
            </Stack>} 
        </Stack>
    );
}

export default HomePage;