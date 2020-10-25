const router = require('express').Router();
let UserModel = require('../models/User')

const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const authValidator = require('../validators/AuthValidators');
const homepageController = require('../controllers/HomepageController');
const dashboardController = require('../controllers/DashboardController');
const admincampusController = require('../controllers/AdminCampusController');
const adminDepartmentController = require('../controllers/AdminDepartmentController');

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
router.get('/adminCampus/allClassrooms', admincampusController.classroomsAll)

//createClassroom
//Given Classroom Data ( *Name , *Capacity, *Building , features) creates Classroom and returns its Data
//Error "If classroom with same name already exists"
router.post('/adminCampus/createNewClassroom', admincampusController.createNewClassroom);

//updateClassroom
//Given Classroom id and Data ( *Name , *Capacity, *Building , features) updates Classroom and returns its Data
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
router.post('/adminCampus/searchClassroom/', admincampusController.searchClassroom);

//allUsers
// returns all users from the campus of the campusAdmin
// returns array with all combined users 
// also separate arrays for all students, professors and campus Administrators
router.get('/adminCampus/allUsers/', admincampusController.allUsers)

//Update user Role 
// Receives newRole on body parameter
// Fails if given user id does not exist 
router.post('/adminCampus/updateUserRole/:id', admincampusController.updateUserRole)


/*+----------------------------------------------------------------------
 // SUPER ADMIN == ADMIN DEPARTMENT  
|+-----------------------------------------------------------------------*/

//Get all courses
//Returns an array of all the courses from the campus 
router.get('/adminDep/allCourses/', adminDepartmentController.allCourses)



/*+----------------------------------------------------------------------
 // END OF SUPER ADMIN == ADMIN DEPARTMENT  
|+-----------------------------------------------------------------------*/






//Old routes 
router.get('/dashboardUser', dashboardController.dashboard);
router.get('/dashboard/courses', dashboardController.courses);
router.get('/dashboard/favCourses', dashboardController.favCourses);



module.exports = router;