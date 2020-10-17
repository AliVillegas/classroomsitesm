let classroomModel = require('../models/Classroom')
let CampusAdminModel = require('../models/CampusAdmin')

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

exports.createNewClassroom = (req, res) => {
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