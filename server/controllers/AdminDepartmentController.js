let CourseModel = require('../models/Course')
let roleValidator = require('../validators/AuthValidators')
let DepAdminModel = require('../models/DepartmentAdmin')
let constants = require('../constants')

/*+----------------------------------------------------------------------
 // COURSES
|+-----------------------------------------------------------------------*/

exports.allCourses = (req, res) => {
    limit = constants.queryLimit
    if(req.query.limit){
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


/*+----------------------------------------------------------------------
 // END OF COURSES
|+-----------------------------------------------------------------------*/
