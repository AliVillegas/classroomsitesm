const router = require('express').Router();
let UserModel = require('../models/User')

const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const authValidator = require('../validators/AuthValidators');
const homepageController = require('../controllers/HomepageController');
const dashboardController = require('../controllers/DashboardController');
const admincampusController = require('../controllers/AdminCampusController');
const adminDepartmentController = require('../controllers/AdminDepartmentController');
const staffController = require('../controllers/StaffController');
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
router.get('/', homepageController.index);
router.get('/protected', authMiddleware.isAuth, (req, res) => {
    res.send('Protected route, user correctly authenticated');
})

/*+----------------------------------------------------------------------
 // AUTHENTICATION
|+-----------------------------------------------------------------------*/

router.get('/auth/office365/login', passport.authenticate('azure_ad_oauth2'));
router.get('/auth/office365/logout', dashboardController.logout);
router.get('/auth/office365/callback',
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/auth/office365/fail' }),
    function(req, res) {
        res.redirect(CLIENT_HOME_PAGE_URL);
    }
);
router.get('/auth/office365/success', (req, res) => {
    //console.log(req.user)
    if (req.user) {
        /* UserModel.findByEmail(req.user.email).then(user => {
            console.log("Found user", user)
                UserModel.attachSessionId(user.id)
            }) */
        res.status(200).json({
            authenticated: true,
            message: "user successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    } else {
        res.status(401).json({
            authenticated: false,
            message: "user not authenticated"
        });
    }

});
router.get('/auth/office365/fail', (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    })
});

/*+----------------------------------------------------------------------
 // END OF AUTH
|+-----------------------------------------------------------------------*/


/*+----------------------------------------------------------------------
 // ADMIN CAMPUS ENDPOINTS (User Must have admin role in order to access api )
|+-----------------------------------------------------------------------*/

//allClassrooms
//Returns classrooms Array
// accepts limit param

router.get('/adminCampus/allClassrooms', admincampusController.classroomsAll)

//createClassroom
//Given Classroom Data ( *Name , *Capacity, *Building , features) creates Classroom and returns its Data
//Error "If classroom with same name already exists"
router.post('/adminCampus/createNewClassroom', admincampusController.createNewClassroom);

//updateClassroom
//Given Classroom id and Data ( Name , Capacity, Building , features) updates Classroom and returns its Data
//Error classroom doesnt exist 
router.post('/adminCampus/updateClassroom/:id', admincampusController.updateClassroom);

//deleteClassroom 
//Given Classroom id , classroom is deleted
// Error classroom doesnt exist
router.post('/adminCampus/deleteClassroom/:id', admincampusController.deleteClassroom);

//searchClassroom (by similar name,building, features or capacity)
//Given a text query, returns all classrooms matching it 
//If no classroom matches query, returns empty array 
//Error Invalid query search
// accepts limit param
router.post('/adminCampus/searchClassroom/', admincampusController.searchClassroom);

//allUsers
// returns all users from the campus of the campusAdmin
// returns array with all combined users 
// also separate arrays for all students, professors and campus Administrators
// accepts limit param
router.get('/adminCampus/allUsers/', admincampusController.allUsers)

//Update user Role 
// Receives newRole on body parameter
// Fails if given user id does not exist 
router.post('/adminCampus/updateUserRole/:id', admincampusController.updateUserRole)


/*+----------------------------------------------------------------------
 // ADMIN DEPARTMENT  && ADMIN CAMPUS
|+-----------------------------------------------------------------------*/

//Get all courses
//Returns an array of all the courses from the campus 
// accepts limit param
router.get('/adminDep/allCourses/', adminDepartmentController.allCourses)

//createCourse
//Given Course Data ( *Name , description, classroomId ) creates a Course and returns its Data
//Error Course data is invalid or incomplete
router.post('/adminDep/createCourse/', adminDepartmentController.createCourse);

//updateCourse
//Given Course id and Data ( *Name , description, classroomId ) updates Course and returns its Data
//Error Course doesnt exist or Course is from another campus as the admin 
router.post('/adminDep/updateCourse/:id', adminDepartmentController.updateCourse);

//deleteCourse
//Given Course id deletes Course
//Error Course doesnt exist or Course is from another campus as the admin 
router.post('/adminDep/deleteCourse/:id', adminDepartmentController.deleteCourse);



//createClass
//Given Class Data ( *Name , description, classroomId ) 
//creates a Course and returns its Data 
<<<<<<< HEAD
//(*course_id,timeFromMon, timeToMon, timeFromTu,timeToTu
//timeFromWed,timeToWed,timeFromTh,timeToTh,timeFromFr,timeToFr,timeFromSat,timeToSat)
=======
//(*course_id,TimeFromMon, TimeToMon, TimeFromTu,TimeToTu
//TimeFromWed,TimeToWed,TimeFromTh,TimeToTh,TimeFromFr,TimeToFr,TimeFromSat,TimeToSat)
>>>>>>> master
//Error Class data is invalid or incomplete
router.post('/adminDep/createClass/', adminDepartmentController.createClass);

/*+----------------------------------------------------------------------
 // END OF ADMIN DEPARTMENT  
|+-----------------------------------------------------------------------*/

/*+----------------------------------------------------------------------
 // STUDENTS AND PROFESSORS CLASSES
|+-----------------------------------------------------------------------*/
//Get all classes
//Returns an array of all the classes from the campus 
// accepts limit param
router.get('/staff/allClasses/', staffController.allClasses)



/*+----------------------------------------------------------------------
 // END STUDENTS AND PROFESSORS CLASSES
|+-----------------------------------------------------------------------*/






//Old routes 
router.get('/dashboardUser', dashboardController.dashboard);
router.get('/dashboard/courses', dashboardController.courses);
router.get('/dashboard/favCourses', dashboardController.favCourses);



module.exports = router;