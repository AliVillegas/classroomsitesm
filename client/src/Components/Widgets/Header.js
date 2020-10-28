import { Box ,Heading, SimpleGrid,Button } from '@chakra-ui/core';
import React from 'react';
import { BaseUrl } from '../../constants';

const Header = ({ authenticated, handleLogout }) => {

    const handleLogoutClick = () => {
        window.open(BaseUrl + "/auth/office365/logout", "_self");
        handleLogout();
    }
    const handleSignInClick = () => {
        window.open(BaseUrl + "/auth/office365/login", "_self");
    }

    return (
        <SimpleGrid bg="blue.500" columns={4} textAlign="center">
            <Box my="auto">
                <Heading lineHeight={'10px'} verticalAlign="middle" color="white" p={1} size="lg">ClassroomsITESM</Heading>
            </Box>
            <Box></Box>
            <Box></Box>
            <Box>
                {authenticated ? (
                    <Button onClick={handleLogoutClick} mt={4} mb={3}>
                        Logout
                    </Button>
                ) : (
                    <Button onClick={handleSignInClick} mt={4} mb={3}>
                        Login
                    </Button>
                )}
            </Box>
        </SimpleGrid>
    )
}

export default Header;