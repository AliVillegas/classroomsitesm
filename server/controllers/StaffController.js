// STAFF INCLUDES PROFESSORS AND STUDENTS


let roleValidator = require('../validators/AuthValidators')
let constants = require('../constants')
let CampusAdminModel = require('../models/CampusAdmin')
let DepAdminModel = require('../models/DepartmentAdmin')
let ProfessorModel = require('../models/Professor')
let StudentModel = require('../models/Student')
let ClassModel = require('../models/Class')


exports.allClasses = (req, res) => {
    limit = constants.queryLimit
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (roleValidator.isCampusAdmin(req)) {
            CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
                ClassModel.allClassesSameCampus(campusAdmin.campus_id,limit).then(classes => {
                    console.log("Retrieved all classes from the same cmapus")
                    res.status(200).json({
                        classes: classes,
                        message: "All classes from the same campus",
                    });
                })

            })
    } 
    else if (roleValidator.isDepartmentAdmin(req)) {
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            ClassModel.allClassesSameCampus(depAdmin.campus_id,limit).then(classes => {
                console.log("Retrieved all classes from the same cmapus")
                res.status(200).json({
                    classes: classes,
                    message: "All classes from the same campus",
                });
            })
        })
    } 
    else if (roleValidator.isProfessor(req)) {
        ProfessorModel.findByUserID(req.user.id).then(prof => {
            ClassModel.allClassesSameCampus(prof.campus_id,limit).then(classes => {
                console.log("Retrieved all classes from the same cmapus")
                res.status(200).json({
                    classes: classes,
                    message: "All classes from the same campus",
                });
            })
        })
    } 
    else if (roleValidator.isStudent(req)) {
        StudentModel.findByUserID(req.user.id).then(student => {
            ClassModel.allClassesSameCampus(student.campus_id,limit).then(classes => {
                console.log("Retrieved all classes from the same cmapus")
                res.status(200).json({
                    classes: classes,
                    message: "All classes from the same campus",
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

}


exports.classesByCourseName = (req, res) => {
    limit = constants.queryLimit
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (roleValidator.isCampusAdmin(req)) {
        let name = req.body.searchQuery
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            ClassModel.findByCourseName(campusAdmin.campus_id, name, limit).then(classes => {
                res.status(200).json({
                    classes: classes,
                    message: "Found classes with given course name"
                });

            })
        })

    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        let name = req.body.searchQuery
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            ClassModel.findByCourseName(depAdmin.campus_id, name, limit).then(classes => {
                res.status(200).json({
                    classes: classes,
                    message: "Found classes with given course name"
                });

            })
        })
    }
    else if (roleValidator.isProfessor(req)) {
        let name = req.body.searchQuery
        ProfessorModel.findByUserID(req.user.id).then(prof => {
            ClassModel.findByCourseName(prof.campus_id, name, limit).then(classes => {
                res.status(200).json({
                    classes: classes,
                    message: "Found classes with given course name"
                });

            })
        })
    }
    else if (roleValidator.isStudent(req)) {
        let name = req.body.searchQuery
        StudentModel.findByUserID(req.user.id).then(student => {
            ClassModel.findByCourseName(student.campus_id, name, limit).then(classes => {
                res.status(200).json({
                    classes: classes,
                    message: "Found classes with given course name"
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