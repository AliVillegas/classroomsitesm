let classroomModel = require('../models/Classroom')
let CampusAdminModel = require('../models/CampusAdmin')
let roleValidator = require('../validators/AuthValidators')

/*+----------------------------------------------------------------------
 // CLASSROOMS
|+-----------------------------------------------------------------------*/

exports.classroomsAll = (req, res) => {
    if (req.user) {
        if (roleValidator.isCampusAdmin(req)) {
            CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                classroomModel.allClassroomsSameCampus(campusAdmin.id).then(classrooms => {
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

exports.createNewClassroom = (req, res) => {
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
            campusId = campusAdmin.id
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
    if (roleValidator.isCampusAdmin(req)) {
        let id = req.params.id;
        classroomModel.find(id).then((classroom) => {
            if (classroom == null) {
                res.status(200).json({
                    error: "Classroom doesnn't exist"
                });
            } else {
                let updateClassroom = {
                    name: req.body.name,
                    capacity: req.body.capacity,
                    building: req.body.building,
                    features: req.body.features
                }

                classroomModel.update(id, updateClassroom)
                    .then((id) => {
                        classroomModel.findById(id).then((newClassroom) => {
                            res.status(200).json({
                                classroom: newClassroom,
                                message: "Classroom updated successfully"
                            });
                        });
                    })
            }
        })
    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}


exports.deleteClassroom = (req, res) => {
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
    if (roleValidator.isCampusAdmin(req)) {
        let name = req.body.searchQuery
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            classroomModel.findByAnySameCampus(campusAdmin.id, name).then(classrooms => {

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
    if (roleValidator.isCampusAdmin(req)) {
        res.status(200).json({
            message: "All users from the campus "
        });

    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

//Old 
exports.classroomsManagement = (req, res) => {
    console.log("USER")
    console.log(req.user)
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