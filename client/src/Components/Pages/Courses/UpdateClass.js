import React, { useEffect, useState } from 'react';
import { Heading, FormControl, Stack, FormLabel, Input, Button, Select } from '@chakra-ui/core';
import axios from 'axios';
import { BaseUrl } from '../../../constants'
import { Link, Redirect, useParams } from 'react-router-dom';

const UpdateClass = ({ user }) => {

    const [course, setCourse] = useState("");
    const [professor, setProfessor] = useState(null);
    const [classroom, setClassroom] = useState(null);

    const [classrooms, setClassrooms] = useState([]);
    const [professors, setProfessors] = useState([]);

    const [redirect, setRedirect] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(BaseUrl + `/staff/getClass/${id}`, { withCredentials: true })
            .then(response => {
                setProfessor(response.data.class.professor_id)
                setClassroom(response.data.class.classroom_id)
                setCourse(response.data.class.course)
            }).catch(err => {
                console.log(err)
            })

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
            }, { withCredentials: true })
            .then(response => {
                setRedirect("/admin_courses")
            }).catch(err => {
                console.log(err)
            })
    }
    if (!professor || !classroom || !course) {
        return <div>Loading...</div>;
    }
    if (user && (user.role === 'admin' || user.role === 'adminDep')) {
        if (redirect === "") {
            return (
                <Stack p={10}>
                    <Link to='/'>Return to dashboard </Link>
                    <Heading mt={5}>Update Class Information</Heading>
                    <FormControl px={10}>
                        <FormLabel isRequired htmlFor="course">Course</FormLabel>
                        <Input isRequired id="course" value={course} placeholder="Course name" onChange={(e) => { setCourse(e.target.value) }} />

                        <FormLabel isRequired htmlFor="classroom">Classroom</FormLabel>
                        <Select placeholder="Select Classroom" value={classroom} onChange={(e) => { setClassroom(e.target.value) }}>
                            {classrooms.map((c, i) => {
                                return (
                                    <option key={`class_${i}`} value={c.id}>{c.name}</option>
                                );
                            })}
                        </Select>
                        {professor? "" :'value{professor}'}
                        <FormLabel htmlFor="professor">Professor</FormLabel>
                        <Select placeholder="Select Professor" value={professor} onChange={(e) => { setProfessor(e.target.value) }}>
                            {professors.map((p, i) => {
                                return (
                                    <option key={`prof_${i}`} value={p.id}>{p.name}</option>
                                );
                            })}
                        </Select>

                        <Button variantColor="blue" size="md" mt={3} onClick={handleClick}>
                            Create
                        </Button>
                    </FormControl>
                </Stack>
            )
        } else {
            return <Redirect to={redirect}></Redirect>
        }
    } else {
        return <Redirect to="/"></Redirect>
    }

}

export default UpdateClass;