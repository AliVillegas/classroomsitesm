let CourseModel = require('../models/Course')
let roleValidator = require('../validators/AuthValidators')
let DepAdminModel = require('../models/DepartmentAdmin')
let constants = require('../constants')
let CampusAdminModel = require('../models/CampusAdmin')

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
                            console.log(updatedCourse)
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
/*+----------------------------------------------------------------------
 // END OF COURSES
|+-----------------------------------------------------------------------*/
