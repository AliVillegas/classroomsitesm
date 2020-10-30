let classroomModel = require('../models/Classroom')
let CampusAdminModel = require('../models/CampusAdmin')
let UserModel = require('../models/User')
let StudentModel = require('../models/Student')
let ProfessorModel = require('../models/Professor')
let DepAdminModel = require('../models/DepartmentAdmin')

let roleValidator = require('../validators/AuthValidators')
let constants = require('../constants')
    /*+----------------------------------------------------------------------
     // CLASSROOMS
    |+-----------------------------------------------------------------------*/

exports.classroomsAll = (req, res) => {
    if (req.user) {
        limit = constants.queryLimit
        if (req.query.limit) {
            limit = req.query.limit
        }
        if (true) {
            CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                classroomModel.allClassroomsSameCampus(campusAdmin.campus_id, limit).then(classrooms => {
                    //console.log("CLASSROOMS", classrooms)
                    res.status(200).json({
                        classrooms: classrooms,
                        message: "Classrooms from same campus",
                    });
                })
            })
        } else {
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

exports.professorsAll = (req, res) => {
    if (req.user) {
        limit = constants.queryLimit
        if (req.query.limit) {
            limit = req.query.limit
        }
        if (roleValidator.isCampusAdmin(req)) {
            CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                ProfessorModel.allSameCampus(campusAdmin.campus_id).then(professors => {
                    //console.log("CLASSROOMS", classrooms)
                    res.status(200).json({
                        professors: professors,
                        message: "Classrooms from same campus",
                    });
                })
            })
        } 
        if (roleValidator.isDepartmentAdmin(req)) {
            DepAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                ProfessorModel.allSameCampus(campusAdmin.campus_id).then(professors => {
                    //console.log("CLASSROOMS", classrooms)
                    res.status(200).json({
                        professors: professors,
                        message: "Classrooms from same campus",
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


exports.getClassroom = (req, res) => {
    if (!req.params.id) {
        res.status(200).json({
            message: "No classroom id provided",
        });
    }
    if (req.user) {
        if (roleValidator.isCampusAdmin(req)) {
            CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                classroomModel.findById(req.params.id).then(classroom => {
                    res.status(200).json({
                        classroom: classroom,
                        message: "Classroom retrieved",
                    });
                })
            })
        } else {
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

exports.createNewClassroom = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    if (roleValidator.isCampusAdmin(req)) {
        //console.log(req.body)
        let name = req.body.name
        let campusId = 1
        let newClassroom = {
            name: name,
            capacity: req.body.capacity,
            building: req.body.building,
            features: req.body.features
        }
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            campusId = campusAdmin.campus_id
            classroomModel.classroomAlreadyExists(name, campusId).then((result) => {
                //console.log(res)
                if (result) {
                    res.status(200).json({
                        error: "Classroom with that name already exists"
                    });
                } else {
                    classroomModel.createNewClassroom(newClassroom, campusId).then((classroomId) => {
                        classroomModel.findById(campusId, classroomId).then((newClassroom) => {
                            res.status(200).json({
                                classroom: newClassroom,
                                message: "Classroom created successfully",
                            });
                        })

                    })
                }
            })
        })
    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}

exports.updateClassroom = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    if (roleValidator.isCampusAdmin(req)) {
        let id = req.params.id;
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            classroomModel.find(id, ).then((classroom) => {
                if (classroom == null) {
                    res.status(200).json({
                        error: "Classroom doesn't exist"
                    });
                } else if (classroom.campus_id !== campusAdmin.campus_id) {
                    res.status(401).json({
                        message: "Unauthorized access"
                    });
                } else {
                    let updateClassroom = {
                        name: req.body.name,
                        capacity: req.body.capacity,
                        building: req.body.building,
                        features: req.body.features
                    }

                    classroomModel.update(id, updateClassroom)
                    classroomModel.findById(id).then((newClassroom) => {
                        res.status(200).json({
                            classroom: newClassroom,
                            message: "Classroom updated successfully"
                        });
                    });
                }
            })
        })

    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}


exports.deleteClassroom = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    if (roleValidator.isCampusAdmin(req)) {
        console.log("User has access to delete Classroom")
        let id = req.params.id;
        let campusId = 1
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            campusId = campusAdmin.id
            classroomModel.find(id).then((classroom) => {
                if (classroom == null) {
                    res.status(200).json({
                        error: "Classroom doesn't exist"
                    });
                } else {
                    classroomModel.delete(classroom.id, campusId)
                        .then(() => {
                            res.status(200).json({
                                message: "Classroom succesfully deleted"
                            });
                        });
                }

            });
        });

    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

exports.searchClassroom = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    limit = constants.queryLimit
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (roleValidator.isCampusAdmin(req)) {
        let name = req.body.searchQuery
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            classroomModel.findByAnySameCampus(campusAdmin.campus_id, name, limit).then(classrooms => {

                //console.log("CLASSROOMS", classrooms)
                res.status(200).json({
                    classrooms: classrooms,
                    message: "Found classrooms"
                });

            })
        })

    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

/*+----------------------------------------------------------------------
 // USERS
|+-----------------------------------------------------------------------*/

exports.allUsers = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    limit = constants.queryLimit
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (roleValidator.isCampusAdmin(req)) {
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            UserModel.all(limit).then(users => {
                res.status(200).json({
                    message: "All users from the campus",
                    users: users,
                });
            })
        })


    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

exports.getUser = (req, res) => {
    if (!req.params.id) {
        res.status(200).json({
            message: "No user id provided",
        });
    }
    if (req.user) {
        if (roleValidator.isCampusAdmin(req)) {
            CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                UserModel.find(req.params.id).then(user => {
                    res.status(200).json({
                        user: user,
                        message: "User retrieved",
                    });
                })
            })
        } else {
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
exports.updateUserRole = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    if (roleValidator.isCampusAdmin(req)) {
        let id = req.params.id;
        UserModel.find(id).then((user) => {
            if (user == null) {
                res.status(200).json({
                    error: "User doesn't exist"
                });
            } else {
                let newRole = req.body.newRole
                UserModel.updateRole(id, newRole)
                    .then((updatedUser) => {
                        res.status(200).json({
                            message: "User role updated successfully",
                            user: updatedUser
                        });
                    });
            }
        })
    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}
exports.updateUser = (req, res) => {
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    if (roleValidator.isCampusAdmin(req)) {
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            UserModel.all().then(users => {
                res.status(200).json({
                    message: "All users from the campus ",
                    users: users
                });
                //campusAdmin.id, name
            })
        })


    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}


//Old 
exports.classroomsManagement = (req, res) => {
    //console.log("USER")
    //console.log(req.user)
    if (req.user === undefined) {
        res.status(401).json({
            message: "Unauthorized access"
        });
        return
    }
    if (roleValidator.isCampusAdmin(req)) {
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            console.log("CAMPUS ADMIN", campusAdmin)
            classroomModel.allClassroomsSameCampus(campusAdmin.campus_id).then(classrooms => {
                console.log("CLASSROOMS", classrooms)
                res.render('adminCampus/manageClassroomsAdmin', {
                    name: req.user.name,
                    email: req.user.email,
                    classrooms: classrooms
                });
            })

        })

    } else {
        res.redirect('/')
    }
}