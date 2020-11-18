import React from 'react';
import { Box, Heading, SimpleGrid, Button } from '@chakra-ui/core';
import { BaseUrl } from '../../constants';
import axios from 'axios';

const FavClassData = ({user, classR, handleChange}) => {
    var gapi = window.gapi
        var CLIENT_ID = "598537861437-v3cuakhpdh6jdv5bvo0br3j7r0m2omnt.apps.googleusercontent.com"
        var API_KEY = "AIzaSyCcnXu7-_sUhufOolav5OGLcHLpjHv1nas"
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar.events"
    const handleCalendar = (courseName,buildingName) => {
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
            .then(() => {
                axios.get(BaseUrl + `/staff/getClass/${classR.classId}`, { withCredentials: true })
                .then(responseClass => {
                    let schedule = JSON.parse(responseClass.data.class.schedule)
                    let events = []
                    for(var i = 0; i < schedule.length; i++){
                        var event = {
                            'summary': courseName,
                            'location':buildingName ,
                            'description': 'Course',
                            'start': {
                            'dateTime': schedule[i][0],
                            'timeZone': 'America/Los_Angeles'
                            },
                            'end': {
                            'dateTime': schedule[i][1],
                            'timeZone': 'America/Los_Angeles'
                            },
                            'recurrence': [
                                'RRULE:FREQ=WEEKLY;COUNT=10'
                            ],
                        }
                        events.push(event)
                    }
                    for(var i = 0; i < events.length; i++){
                        var request = gapi.client.calendar.events.insert({
                            'calendarId': 'primary',
                            'resource': events[i],
                        })
                        if(i == events.length - 1){
                            request.execute(event => {
                                console.log(event)
                                window.open(event.htmlLink)
                            })
                        }
                        else{
                            request.execute(event => {
                                console.log(event)
                            })
                        }
                        
                    } 
                }).catch(err => {
                    console.log(err)
                })
                    
            })
    }

    return (
        <SimpleGrid columns={4} border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
            <Box>
                <Heading bg="blue.300" color="white" p={1} size="sm">{classR.course}</Heading>
            </Box>
            <Box>{classR.name}</Box>
            <Box>{classR.building}</Box>
            <Button size="xs" variantColor="blue" onClick={e => handleCalendar(classR.course,classR.building)}>
                            Add to Google
            </Button>
        </SimpleGrid>
    );
}

export default FavClassData;