let CourseModel = require('../models/Course')
let roleValidator = require('../validators/AuthValidators')
let DepAdminModel = require('../models/DepartmentAdmin')
let constants = require('../constants')
let CampusAdminModel = require('../models/CampusAdmin')
let ClassModel = require('../models/Class')

/*+----------------------------------------------------------------------
 // COURSES
|+-----------------------------------------------------------------------*/

exports.allCourses = (req, res) => {
    limit = constants.queryLimit
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (req.user) {
        if (roleValidator.isCampusAdmin(req) || roleValidator.isDepartmentAdmin(req)) {
            DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
                CourseModel.all(limit).then(courses => {
                    console.log("Retrieved all courses")
                    res.status(200).json({
                        courses: courses,
                        message: "All Courses",
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

exports.createCourse = (req, res) => {
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
            campus_id: request.body.campusId,
            name: request.body.name,
            classroom_id: request.body.classroom_id,
            description: request.body.description
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


exports.updateCourse = (req, res) => {
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
                    let updateCourse = {
                        name: req.body.name,
                        description: req.body.description,
                        campus_id: req.body.campusId,
                        features: req.body.features
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
                    let updateCourse = {
                        name: req.body.name,
                        description: req.body.description,
                        campus_id: req.body.campusId,
                        features: req.body.features
                    }

                    CourseModel.update(id, updateCourse)
                        .then((id) => {
                            CourseModel.find(id).then((newCourse) => {
                                console.log("Updated Course")

                                res.status(200).json({
                                    course: newCourse,
                                    message: "Course updated successfully"
                                });
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
    console.log(req.user)

    if (roleValidator.isCampusAdmin(req)) {

        console.log("User has access to delete Course")
        let id = req.params.id;
        let campusId = 1
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            campusId = campusAdmin.id
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
        console.log("User has access to delete Course")
        let id = req.params.id;
        let campusId = 1
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            campusId = depAdmin.id
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
/*+----------------------------------------------------------------------
 // END OF COURSES
|+-----------------------------------------------------------------------*/

exports.createClass = (req, res) => {

    let course_id = null
    let timeFromMon = null
    let timeToMon = null
    let timeFromTu = null
    let timeToTu = null
    let timeFromWed = null
    let timeToWed = null
    let timeFromTh = null
    let timeToTh = null
    let timeFromFr = null
    let timeToFr = null
    let timeFromSat = null
    let timeToSat = null
    if (!req.body.course_id) {
        res.status(401).json({
            message: "No  course id was given"
        });
    }
    else{
        course_id = req.body.course_id
    }
    if (req.body.timeFromMon) {
        timeFromMon = req.body.timeFromMon
    }
    if (req.body.timeToMon) {
        timeFromMon = req.body.timeToMon
    }

    if (req.body.timeFromTu) {
        timeFromMon = req.body.timeFromTu
    }
    if (req.body.timeToTu) {
        timeFromMon = req.body.timeToTu
    }

    if (req.body.timeFromWed) {
        timeFromMon = req.body.timeFromWed
    }
    if (req.body.timeToWed) {
        timeFromMon = req.body.timeToWed
    }

    if (req.body.timeFromTh) {
        timeFromMon = req.body.timeFromTh
    }
    if (req.body.timeToTh) {
        timeFromMon = req.body.timeToTh
    }

    if (req.body.timeFromFr) {
        timeFromMon = req.body.timeFromFr
    }
    if (req.body.timeToFr) {
        timeFromMon = req.body.timeToFr
    }

    if (req.body.timeFromSat) {
        timeFromMon = req.body.timeFromSat
    }
    if (req.body.timeToSat) {
        timeFromMon = req.body.timeToSat
    }
    let newClass = {
        course_id: course_id,
        timeFromMon: timeFromMon,
        timeToMon: timeToMon,
        timeFromTu: timeFromTu,
        timeToTu: timeToTu,
        timeFromWed: timeFromWed,
        timeToWed: timeToWed,
        timeFromTh: timeFromTh,
        timeToTh: timeToTh,
        timeFromFr: timeFromFr,
        timeToFr: timeToFr,
        timeFromSat: timeFromSat,
        timeToSat: timeToSat,
    }
    console.log(newClass)
    if (roleValidator.isCampusAdmin(req)) {
        let campusId = 1
        CampusAdminModel.findByUserID(req.user.id).then(campusAdmin => {
            campusId = campusAdmin.campus_id
            CourseModel.find(course_id).then(course => {
                if (course == null) {
                    res.status(200).json({
                        error: "Course given doesn't exist"
                    });
                }
                else{
                    if (campusId === course.campus_id) {
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
        })
    }
    else if (roleValidator.isDepartmentAdmin(req)) {
        let campusId = 1
        DepAdminModel.findByUserID(req.user.id).then(depAdmin => {
            campusId = depAdmin.campus_id
            CourseModel.find(course_id).then(course => {
                if (course == null) {
                    res.status(200).json({
                        error: "Course given doesn't exist"
                    });
                }
                else{
                    if (campusId === course.campus_id) {
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
        })
    }
    else {
        res.status(401).json({
            message: "Unauthorized access"
        });
    }


}
