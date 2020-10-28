import { Box } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';


const ClassInfo = ({ authenticated, user }) => {
    const [classes, setClasses] = useState([]);
    
    useEffect(() => {
     
    }, [])

    if (user) {
        return (
            <Box>
                pene
            </Box>
        )
    }
    else {
        return <Redirect to="/" />
    }
}
export default ClassInfo;