import React from 'react';
import { Box, Heading, SimpleGrid, Button } from '@chakra-ui/core';


const FavClassData = ({user, classR, handleChange}) => {
    var gapi = window.gapi
        var CLIENT_ID = "598537861437-v3cuakhpdh6jdv5bvo0br3j7r0m2omnt.apps.googleusercontent.com"
        var API_KEY = "0sfHjbMNwHfXxRaP8O9Sr_J3"
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar.events"
    const handleCalendar = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client') })
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {})
    }

    return (
        <SimpleGrid columns={3} border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
            <Box>
                <Heading bg="blue.300" color="white" p={1} size="sm">{classR.course}</Heading>
            </Box>
            <Box>{classR.name}</Box>
            <Box>{classR.building}</Box>
            <Button size="xs" variantColor="blue" onClick={handleCalendar}>
                            Add to Google
            </Button>
        </SimpleGrid>
    );
}

export default FavClassData;