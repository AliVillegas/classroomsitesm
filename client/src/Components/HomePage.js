import { Stack, Box, Heading } from '@chakra-ui/core';
import React, {useEffect, useState} from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { AuthenticatedState, CurrentSession } from '../atoms';

import Header from './Header';

const HomePage = () => {
    const user = useRecoilValue(CurrentSession);
    const authenticated = useRecoilValue(AuthenticatedState);

    return(
        <Stack p={10}>
            <Header></Header>
            <Box>{authenticated ? "true" : "no"}</Box>
            {!authenticated ? (
                <Box>Hola</Box>
            ) : 
            <Stack>
                <Heading>You have logged in succesfully</Heading>
                <Box>Welcome {user.name}</Box>
            </Stack>} 
        </Stack>
    )
}

export default HomePage;