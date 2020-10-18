import { Box } from '@chakra-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentSession } from '../atoms';
import { BaseUrl } from '../constants';

const Header = () => {
    const {authenticated, user, error } = useRecoilValue(CurrentSession);

    const handleLogoutClick = () => {
        window.open(BaseUrl + "/auth/office365/logout", "_self");
        // setAuthenticated(false);
    }
    const handleSignInClick = () => {
        window.open(BaseUrl + "/auth/office365/login", "_self");
    }

    return(
        <Box bg="tomato">
            {authenticated ? (
                <li onClick={handleLogoutClick}>Logout</li>
            ) : (
                <li onClick={handleSignInClick}>Login</li>
            )}
        </Box>
    )
}

export default Header;