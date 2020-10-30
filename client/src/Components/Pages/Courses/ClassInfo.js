import { Box } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Heading, Stack, } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../../constants'
import { SimpleGrid } from '@chakra-ui/core';
import { TimeGridScheduler, classes } from 'react-weekly-scheduler'
import 'react-weekly-scheduler/build/index.css';

const ClassInfo = ({ authenticated, user }) => {
    const [classesR, setClassesR] = useState([]);
    const { id } = useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        axios.get(BaseUrl + `/staff/classroomSchedule/${id}`, { withCredentials: true })
            .then((response) => {

                let scheduleReceived = []
                response.data.classes.forEach(classR => {
                    if (classR.schedule != null) {
                        let mainSchedule = JSON.parse(classR.schedule)
                        let time = ""

                        mainSchedule.forEach(times => {
                            times.forEach(eachTime => {
                                let d = Date.parse(eachTime)
                                const w = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(d);
                                const h = new Intl.DateTimeFormat('en', {
                                    hour: '2-digit', hour12: false,
                                }).format(d);
                                const m = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);
                                time += `${w} ${h}:${m} `
                                classR.time = time
                            });
                            scheduleReceived.push(times)
                        });
                    }
                });
                setClassesR(response.data.classes)
                setSchedule(scheduleReceived)
            }).catch(err => {
                console.log(err);
            });
    }, [id])

    if (user) {
        return (
            <>
                <Stack p={10}>
                    <Link to='/'>Return to dashboard </Link>
                    <Heading mt={5}>Classroom Schedule</Heading>
                </Stack>
                <SimpleGrid columns={3} mb={5} mx="auto" border="2px" width="85vw" borderRadius="md" borderColor="gray.600" textAlign="center">
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">Course</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">Professor</Heading>
                    </Box>
                    <Box>
                        <Heading bg="blue.500" color="white" p={1} size="sm">Time</Heading>
                    </Box>
                    <Box>
                    </Box>
                </SimpleGrid>
                {classesR.map((classR) => {

                    return (
                        <SimpleGrid columns={3} mx="auto" width="85vw" border="1px" borderRadius="md" borderColor="gray.600" textAlign="center">
                            <Box height="100%">
                                <Heading height="100%" bg="blue.300" color="white" p={1} size="sm">{classR.course}</Heading>
                            </Box>
                            <Box>{classR.name}</Box>
                            {(classR.schedule === null) ? (
                                <>
                                    <Box>{classR.time}</Box>

                                </>
                            ) : (
                                    <Box>{classR.time}</Box>
                                )}
                        </SimpleGrid>
                    )

                })}
                <div
                    className="root"
                    style={{
                        margin: "auto",
                        marginTop: "10px",
                        width: "80vw",
                        height: "500px",
                        "--cell-height": "20px",
                        "--cell-width": "10px",
                    }}
                >
                    <TimeGridScheduler
                        classes={classes}
                        style={{ width: "100%", height: "100%" }}
                        originDate={new Date("2021-01-11")}
                        schedule={schedule}
                        onChange={setSchedule}
                        visualGridVerticalPrecision={15}
                        verticalPrecision={15}
                        cellClickPrecision={60}
                        defaultHours={[7, 22]}
                        disabled={true}


                    />
                </div>
            </>
        )
    }
    else {
        return <Redirect to="/" />
    }
}
export default ClassInfo;