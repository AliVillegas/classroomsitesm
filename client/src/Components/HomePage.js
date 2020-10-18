import { Alert, AlertIcon, AlertDescription, AlertTitle, CloseButton, Stack, Box, Heading } from '@chakra-ui/core';
import React, {useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { UserState, AuthenticatedState } from '../atoms';
import axios from 'axios';
import { BaseUrl } from '../constants';
import Header from './Header';

const HomePage = () => {
    const [user, setUser] = useRecoilState(UserState)
    const [authenticated, setAuthenticated] = useRecoilState(AuthenticatedState);
    const [error, setError] = useState("");
  
    useEffect(() => {
        axios.get(BaseUrl + '/auth/office365/success',{withCredentials: true})
        .then(response => {
            console.log(response)
            if (response.status === 200) return response.json()
            throw new Error("failed to authenticate user");
        }).then(responseJson => {
            console.log(responseJson)
            setAuthenticated(true);
            setUser(responseJson.data.user);
        }).catch(error => {
            console.log(error)

            setAuthenticated(false);
            setError("Failed to authenticate user");
        });
    });

    return(
        <Stack p={10}>
            <Header></Header>
            {!authenticated ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>{error}</AlertTitle>
                    <AlertDescription>{authenticated ? "true" : "no"}</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
            ) : 
            <Stack>
                <Heading>You have logged in succesfully</Heading>
                <Box>Welcome {user.name}</Box>
            </Stack>} 
        </Stack>
    )
}

export default HomePage;