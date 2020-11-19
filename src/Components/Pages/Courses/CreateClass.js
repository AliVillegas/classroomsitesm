import React, { useEffect, useState } from 'react';
import { Heading, FormControl, Stack, FormLabel, Input, Button, Select } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../../constants'
import { Link, Redirect } from 'react-router-dom';
import { TimeGridScheduler, classes } from 'react-weekly-scheduler'
import 'react-weekly-scheduler/build/index.css';

const CreateClassroom = ({ user }) => {

    const [course, setCourse] = useState("");
    const [professor, setProfessor] = useState(null);
    const [classroom, setClassroom] = useState(null);

    const [classrooms, setClassrooms] = useState([]);
    const [professors, setProfessors] = useState([]);

    const [redirect, setRedirect] = useState("");

    
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {

        axios.get(BaseUrl + '/adminCampus/allClassrooms', { withCredentials: true })
            .then((response) => {
                setClassrooms(response.data.classrooms)
            }).catch(err => {
                console.log(err);
            });

        axios.get(BaseUrl + '/adminCampus/allProfessors', { withCredentials: true })
            .then((response) => {
                setProfessors(response.data.professors)
            }).catch(err => {
                console.log(err);
            });


    }, [])

    const handleClick = () => {
        axios.post(BaseUrl + '/adminDep/createClass',
            {
                professor_id: professor,
                classroom_id: classroom,
                course: course,
                schedule: JSON.stringify(schedule)
            }, { withCredentials: true })
            .then(response => {
                setRedirect("/admin_courses")
            }).catch(err => {
                console.log(err)
            }) 
    }

    if (user && (user.role === 'admin' || user.role === 'adminDep')) {
        if (redirect === "") {
            return (
                <Stack p={10}>
                    <Link to='/'>Return to dashboard </Link>
                    <Heading mt={5}>Create Class</Heading>
                    <FormControl px={10}>
                        <FormLabel isRequired htmlFor="course">Course</FormLabel>
                        <Input isRequired id="course" placeholder="Course name" onChange={(e) => { setCourse(e.target.value) }} />

                        <FormLabel isRequired htmlFor="classroom">Classroom</FormLabel>
                        <Select placeholder="Select Classroom" onChange={(e) => { setClassroom(e.target.value) }}>
                            {classrooms.map((c, i) => {
                                return (
                                    <option key={`class_${i}`} value={c.id}>{c.name}</option>
                                );
                            })}
                        </Select>
                        <FormLabel htmlFor="professor">Professor</FormLabel>
                        <Select placeholder="Select Professor" onChange={(e) => { setProfessor(e.target.value) }}>
                            {professors.map((p, i) => {
                                return (
                                    <option key={`prof_${p.id}`} value={p.id}>{p.name}</option>
                                );
                            })}
                        </Select> 
                    </FormControl>
                    <div
                        className="root"
                        style={{
                            margin: "auto",
                            width: "75vw",
                            height: "400px",
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
                            defaultHours = {[7,22]}
                        />
                    </div>
                    <Button variantColor="blue" size="md" mt={3} onClick={handleClick}>
                            Create
                        </Button>
                </Stack>
            )
        } else {
            return <Redirect to={redirect}></Redirect>
        }
    } else {
        return <Redirect to="/"></Redirect>
    }

}

export default CreateClassroom;