let classroomModel = require('../models/Classroom')
let CampusAdminModel = require('../models/CampusAdmin')










//ENDPOINTS

exports.classroomsAll = (req, res) => {
    console.log(req)
    console.log(req.user)
    if (req.user) {
        if (req.user.role === 'admin') {
            CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                classroomModel.allClassroomsSameCampus(campusAdmin.id).then(classrooms => {
                    console.log("CLASSROOMS", classrooms)
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
    }

}

exports.createNewClassroom = (req, res) => {
    if (req.user != null && req.user.role == 'admin') {
        console.log(req.body)
        let name = req.body.name
        let campusId = 1
        let newClassroom = {
            name: name,
            capacity: req.body.capacity,
            building: req.body.building,
            features: req.body.features
        }
        classroomModel.classroomAlreadyExists(name, campusId).then((result) => {
            console.log(res)
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
    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}

exports.updateClassroom = (req, res) => {
    if (req.user != null && req.user.role == 'admin') {
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
    if (req.user != null && req.user.role == 'admin') {
        let id = req.params.id;
        let campusId = 1
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
    } else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }
}

exports.searchClassroom = (req, res) => {
    if (req.user != null && req.user.role == 'admin') {
        let name = req.body.searchQuery
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            classroomModel.findByAnySameCampus(campusAdmin.id, name).then(classrooms => {
                //console.log("CLASSROOMS", classrooms)
                res.render('adminCampus/manageClassroomsAdmin', {
                    name: req.user.name,
                    email: req.user.email,
                    classrooms: classrooms
                });

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
    console.log("USER")
    console.log(req.user)
    if (req.user != null && req.user.role == 'admin') {
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




exports.classroomsSearch = (req, res) => {
    if (req.user != null && req.user.role == 'admin') {
        //console.log("BODY", req.body)
        // console.log("Search", req.body.searchQuery)
        let name = req.body.searchQuery
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            classroomModel.findByAnySameCampus(campusAdmin.id, name).then(classrooms => {
                //console.log("CLASSROOMS", classrooms)
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

exports.editClassroomInfo = (req, res) => {
    if (req.user != null && req.user.role == 'admin') {
        //console.log("BODY", req.body)
        // console.log("Search", req.body.searchQuery)
        let id = req.params.id
        classroomModel.find(id).then(classrooms => {
            console.log("CLASSROOMS", classrooms)
            res.render('adminCampus/editClassroomInfo', {
                name: req.user.name,
                email: req.user.email,
                classrooms: classrooms
            });
        })

    } else {
        res.redirect('/')
    }
}

exports.updateClassroomData = (req, res) => {
    let id = req.params.id;
    classroomModel.find(id).then((classroom) => {
        if (classroom == null) {
            res.status(404).send('Not found');
            return;
        }

        let updateClassroom = {
            name: req.body.classroomName,
            capacity: req.body.classroomCapacity,
            building: req.body.classroomBuilding,
            features: req.body.classroomFeatures
        }

        classroomModel.update(classroom.id, updateClassroom)
            .then((id) => {
                res.redirect('/manageClassroomsAdmin');
            });
    });
}


exports.showCreateNewClassroom = (req, res) => {
    if (req.user != null && req.user.role == 'admin') {
        res.render('adminCampus/createNewClassroom', {

        })

    } else {
        res.redirect('/')
    }
}

exports.createNewClassroomOld = (req, res) => {
    console.log(req.body)
    let name = req.body.classroomName
    let newClassroom = {
        name: name,
        capacity: req.body.classroomCapacity,
        building: req.body.classroomBuilding,
        features: req.body.classroomFeatures
    }
    classroomModel.findOrCreate(newClassroom)
        .then((id) => {
            console.log("CLASSROOM", id)
            res.redirect('/manageClassroomsAdmin');
        });
}

exports.deleteClassroomData = (req, res) => {
    let id = req.params.id;
    classroomModel.find(id).then((classroom) => {
        if (classroom == null) {
            res.status(404).send('Not found');
            return;
        }
        classroomModel.delete(classroom.id)
            .then((id) => {
                res.redirect('/manageClassroomsAdmin');
            });
    });
}