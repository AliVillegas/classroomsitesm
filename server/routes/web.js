const router = require('express').Router();

const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const authValidator = require('../validators/AuthValidators');
const homepageController = require('../controllers/HomepageController');
const dashboardController = require('../controllers/DashboardController');
const admincampusController = require('../controllers/AdminCampusController');
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
router.get('/', homepageController.index);
router.get('/protected', authMiddleware.isAuth, (req, res) => {
    res.send('Protected route, user correctly authenticated');
})

// AUTHENTICATION
router.get('/auth/office365/login', passport.authenticate('azure_ad_oauth2'));
router.get('/auth/office365/logout', dashboardController.logout);
router.get('/auth/office365/callback',
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/auth/office365/fail' }),
    function(req, res) {
        res.redirect(CLIENT_HOME_PAGE_URL);
    });

// ADMIN CAMPUS
router.get('/adminCampus/allClassrooms', admincampusController.classroomsAll)



router.get('/dashboardUser', dashboardController.dashboard);
router.get('/dashboard/courses', dashboardController.courses);
router.get('/dashboard/favCourses', dashboardController.favCourses);

router.get('/dashboardAdminCampus', dashboardController.dashboardAdminCampus);
router.get('/manageClassroomsAdmin', admincampusController.classroomsManagement);
router.post('/classroomsAdminCampus/:id', admincampusController.updateClassroomData);
router.get('/classroomsAdminCampus/create', admincampusController.showCreateNewClassroom);
router.post('/createNewClassroom', admincampusController.createNewClassroom);
router.post('/classroomsAdminCampus/del/:id', admincampusController.deleteClassroomData);
router.post('/classroomsSearch', admincampusController.classroomsSearch);
router.get('/classroomsAdminCampus/:id', admincampusController.editClassroomInfo);




router.get('/auth/office365/success', (req, res) => {
    console.log(req.user)
    if (req.user) {
        res.status(200).json({
            authenticated: true,
            message: "user successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    } else {
        res.status(401).json({
            authenticated: false,
            message: "user died"
        });
    }

});

router.get('/auth/office365/fail', (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    })
});
module.exports = router;