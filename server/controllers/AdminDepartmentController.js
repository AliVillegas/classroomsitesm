let CourseModel = require('../models/Course')
let roleValidator = require('../validators/AuthValidators')
let DepAdminModel = require('../models/DepartmentAdmin')
let constants = require('../constants')
let CampusAdminModel = require('../models/CampusAdmin')
let ClassModel = require('../models/Class')
let ClassroomModel = require('../models/Classroom')

/*+----------------------------------------------------------------------
 // COURSES
|+-----------------------------------------------------------------------*/

exports.allCourses = (req, res) => {
    limit = constants.queryLimit
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (req.user) {
        if (roleValidator.isDepartmentAdmin(req)) {
            DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
                CourseModel.all(limit).then(courses => {
                    console.log("Retrieved all courses")
                    res.status(200).json({
                        courses: courses,
                        message: "All Courses",
                    });
                })

            })
        }
        else if (roleValidator.isCampusAdmin(req)) {
            CampusAdminModel.findByUserID(req.user.id).then(depAdmin => {
                CourseModel.all(limit).then(courses => {
                    console.log("Retrieved all courses")
                    res.status(200).json({
                        courses: courses,
                        message: "All Courses",
                    });
                })

            })
        }

        else {
            res.status(401).json({
                authenticated: false,
                message: "Unauthorized access "
            });
        }
    } else {
        res.status(401).json({
            authenticated: false,
            message: "Unauthorized access "
        });
    }

}

exports.createCourse = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        }); return
    }
    if (roleValidator.isCampusAdmin(req)) {
        let name = req.body.name
        let campusId = 1
        let newCourse = {
            campus_id: req.body.campusId,
            name: req.body.name,
            classroom_id: req.body.classroom_id,
            description: req.body.description
        }
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            campusId = campusAdmin.campus_id
            CourseModel.courseAlreadyExists(name, campusId).then((result) => {
                if (result) {
                    res.status(200).json({
                        error: "Course with that name already exists"
                    });
                } else {
                    CourseModel.createNewCourse(newCourse, campusId).then((newCourse) => {
                        res.status(200).json({
                            course: newCourse,
                            message: "Course created successfully",
                        });

                    })
                }
            })
        })
    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        let name = req.body.name
        let campusId = 1
        let newCourse = {
            campus_id: req.body.campusId,
            name: req.body.name,
            classroom_id: req.body.classroom_id,
            description: req.body.description
        }
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            campusId = depAdmin.campus_id
            CourseModel.courseAlreadyExists(name, campusId).then((result) => {
                if (result) {
                    res.status(200).json({
                        error: "Course with that name already exists"
                    });
                } else {
                    CourseModel.createNewCourse(newCourse, campusId).then((newCourse) => {
                        res.status(200).json({
                            course: newCourse,
                            message: "Course created successfully",
                        });

                    })
                }
            })
        })
    }
    else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}
exports.deleteClass = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        }); return
    }
    if (roleValidator.isCampusAdmin(req)) {
        let id = req.params.id;
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            ClassModel.find(id).then((classFound) => {
                if (classFound == null) {
                    res.status(200).json({
                        error: "Class doesn't exist"
                    });
                }
                else {
                    ClassModel.delete(classFound.classId, campusAdmin.campus_id)
                        .then(() => {
                            res.status(200).json({
                                message: "Class succesfully deleted"
                            });
                        });
                }
            })
        })
    }

    else if (roleValidator.isDepartmentAdmin(req)) {
        let id = req.params.id;
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            ClassModel.find(id).then((classFound) => {
                if (classFound == null) {
                    res.status(200).json({
                        error: "Class doesn't exist"
                    });
                }
                else {
                    ClassModel.delete(classFound.classId, depAdmin.campus_id)
                        .then(() => {
                            res.status(200).json({
                                message: "Class succesfully deleted"
                            });
                        });
                }
            })
        })
    }
}

exports.updateClass = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        }); return
    }
    if (roleValidator.isCampusAdmin(req)) {
        let id = req.params.id;
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            ClassModel.find(id).then((classFound) => {
                if (classFound == null) {
                    res.status(200).json({
                        error: "Class doesn't exist"
                    });
                }
                else {
                    let updatedClass = {
                        classroom_id: req.body.classroom_id,
                        course: req.body.course,
                        schedule: req.body.schedule,
                        professor_id:req.body.professor_id
                    }
                    ClassModel.update(id, updatedClass)
                        .then((updatedClass) => {
                            res.status(200).json({
                                course: updatedClass,
                                message: "Class updated successfully"
                            });
                        })
                }
            })
        })
    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        let id = req.params.id;
        DepAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            ClassModel.find(id).then((classFound) => {
                if (classFound == null) {
                    res.status(200).json({
                        error: "Class doesn't exist"
                    });
                }
                else {
                    let updatedClass = {
                        classroom_id: req.body.classroom_id,
                        course: req.body.course,
                        schedule: req.body.schedule,
                        professor_id:req.body.professor_id
                    }
                    ClassModel.update(id, updatedClass)
                        .then((updatedClass) => {
                            res.status(200).json({
                                course: updatedClass,
                                message: "Class updated successfully"
                            });
                        })
                }
            })
        })


    }
    else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}


exports.updateCourse = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        }); return
    }
    if (roleValidator.isCampusAdmin(req)) {
        let id = req.params.id;
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            CourseModel.find(id).then((course) => {
                if (course == null) {
                    res.status(200).json({
                        error: "Course doesn't exist"
                    });

                }
                else if (course.campus_id !== campusAdmin.campus_id) {
                    res.status(401).json({
                        message: "Unauthorized access"
                    });
                }
                else {
                    let description = course.description
                    if (req.body.description) {
                        description = req.body.description
                    }
                    let classRoomId = null
                    if (req.body.classroom_id) {
                        classRoomId = req.body.classroom_id
                    }
                    let updateCourse = {
                        name: req.body.name,
                        description: description,
                        campus_id: campusAdmin.campus_id,
                        classroom_id: classRoomId
                    }
                    CourseModel.update(id, updateCourse)
                        .then((updatedCourse) => {
                            //console.log(updatedCourse)
                            console.log("Updated Course")
                            res.status(200).json({
                                course: updatedCourse,
                                message: "Course updated successfully"
                            });
                        })
                }
            })
        })

    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        let id = req.params.id;
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            CourseModel.find(id).then((course) => {
                if (course == null) {
                    res.status(200).json({
                        error: "Course doesn't exist"
                    });

                }
                else if (course.campus_id !== depAdmin.campus_id) {
                    res.status(401).json({
                        message: "Unauthorized access"
                    });
                }
                else {
                    let description = course.description
                    if (req.body.description) {
                        description = req.body.description
                    }
                    let classRoomId = null
                    if (req.body.classroom_id) {
                        classRoomId = req.body.classroom_id
                    }
                    let updateCourse = {
                        name: req.body.name,
                        description: description,
                        campus_id: depAdmin.campus_id,
                        classroom_id: classRoomId
                    }
                    CourseModel.update(id, updateCourse)
                        .then((updatedCourse) => {
                            //console.log(updatedCourse)
                            console.log("Updated Course")
                            res.status(200).json({
                                course: updatedCourse,
                                message: "Course updated successfully"
                            });
                        })
                }
            })
        })


    }
    else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

exports.deleteCourse = (req, res) => {
    //console.log(req.user)
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        }); return
    }
    if (roleValidator.isCampusAdmin(req)) {

        console.log("User has access to delete Course")
        let id = req.params.id;
        let campusId = 1
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            campusId = campusAdmin.campus_id
            CourseModel.find(id).then((course) => {
                if (course == null) {
                    res.status(200).json({
                        error: "Course doesn't exist"
                    });
                } else {
                    CourseModel.delete(course.id, campusId)
                        .then(() => {
                            res.status(200).json({
                                message: "Course succesfully deleted"
                            });
                        });
                }

            });
        });

    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        console.log("User depAdmin has access to delete Course")
        let id = req.params.id;
        let campusId = 1
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            campusId = depAdmin.campus_id
            CourseModel.find(id).then((course) => {
                if (course == null) {
                    res.status(200).json({
                        error: "Course doesn't exist"
                    });
                } else {
                    CourseModel.delete(course.id, campusId)
                        .then(() => {
                            res.status(200).json({
                                message: "Course succesfully deleted"
                            });
                        });
                }

            });
        });

    }

    else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

exports.searchCourse = (req, res) => {
    limit = constants.queryLimit
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        }); return
    }
    if (roleValidator.isCampusAdmin(req)) {
        let name = req.body.searchQuery
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            CourseModel.findByNameSameCampusSearch(campusAdmin.campus_id, name, limit).then(courses => {
                res.status(200).json({
                    courses: courses,
                    message: "Found courses"
                });

            })
        })

    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        let name = req.body.searchQuery
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            CourseModel.findByNameSameCampusSearch(depAdmin.campus_id, name, limit).then(courses => {
                res.status(200).json({
                    courses: courses,
                    message: "Found courses"
                });

            })
        })

    }
    else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}
/*+----------------------------------------------------------------------
 // END OF COURSES
|+-----------------------------------------------------------------------*/

exports.createClass = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        }); return
    }
    let course_id = null
    let courseName = null
    let classroom_id = null
    let schedule = null
    if (!req.body.course) {
        res.status(401).json({
            message: "No  course  was given"
        });
    }
    else {
        course_id = req.body.course_id
    }
    if (req.body.classroom_id) {
        classroom_id = req.body.classroom_id
    }
    if (req.body.schedule) {
        schedule = req.body.schedule
    }
    if (req.body.course) {
        course = req.body.course
    }
    
    let newClass = {
        classroom_id: classroom_id,
        course: course,
        schedule: req.body.schedule,
        professor_id:req.body.professor_id
    }
    //console.log(newClass)
    if (roleValidator.isCampusAdmin(req)) {
        let campusId = 1
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            campusId = campusAdmin.campus_id
            ClassroomModel.find(classroom_id).then(classroom => {
                if (classroom == null) {
                    res.status(200).json({
                        error: "Class given doesn't exist"
                    });
                }
                else {
                    if (campusId === classroom.campus_id) {
                        ClassModel.createNewClass(newClass).then((classN) => {
                            res.status(200).json({
                                class: classN,
                                message: "class created successfully",
                            });
                        })
                    }
                    else {
                        res.status(401).json({
                            message: "Unauthorized access"
                        });
                    }
                }
            })
        } )
    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        let campusId = 1
        DepAdminModel.findByUserID(req.user.id).then(admin => {
            campusId = admin.campus_id
            ClassroomModel.find(classroom_id).then(classroom => {
                if (classroom == null) {
                    res.status(200).json({
                        error: "Class given doesn't exist"
                    });
                }
                else {
                    if (campusId === classroom.campus_id) {
                        ClassModel.createNewClass(newClass).then((classN) => {
                            res.status(200).json({
                                class: classN,
                                message: "class created successfully",
                            });
                        })
                    }
                    else {
                        res.status(401).json({
                            message: "Unauthorized access"
                        });
                    }
                }
            })
        } )
    }
    else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}

