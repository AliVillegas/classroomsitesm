import { Stack, Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession } from '../atoms';

import Landing from './Landing';

const HomePage = () => {
    const { authenticated, user, } = useRecoilValue(CurrentSession);

    return(
        <Stack p={10}>
            {!authenticated ? (
                <Landing></Landing>
            ) : 
            <Stack>
                <Heading>You have logged in succesfully</Heading>
                <Box>Welcome {user.name}</Box>
            </Stack>} 
        </Stack>
    );
}

export default HomePage;