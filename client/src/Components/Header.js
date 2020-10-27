import { Box, Flex } from '@chakra-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession } from '../atoms';
import { BaseUrl } from '../constants';

const Header = ({ authenticated, handleLogout }) => {

    const handleLogoutClick = () => {
        window.open(BaseUrl + "/auth/office365/logout", "_self");
        handleLogout();
    }
    const handleSignInClick = () => {
        window.open(BaseUrl + "/auth/office365/login", "_self");
    }

    return(
        <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={["white", "white", "primary.700", "primary.700"]}
        >
            <Box bg="tomato">
                {authenticated ? (
                    <li onClick={handleLogoutClick}>Logout</li>
                ) : (
                    <li onClick={handleSignInClick}>Login</li>
                )}
            </Box>
        </Flex>
    )
}

export default Header;