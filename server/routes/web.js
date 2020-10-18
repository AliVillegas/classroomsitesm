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

router.get('/auth/login', authController.login);
router.get('/auth/register', authController.register);
router.post('/auth/register', authValidator.store, authController.store);
router.post('/auth/login', passport.authenticate('local', { failureRedirect: '/auth/login?authError=1', successRedirect: '/' }));
router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/protected', authMiddleware.isAuth, (req, res) => {
    res.send('Protected route, user correctly authenticated');
})
router.get('/auth/office365/login', passport.authenticate('azure_ad_oauth2'));
router.get('/auth/office365/logout', dashboardController.logout);
/*router.get('/auth/office365/callback', passport.authenticate('azure_ad_oauth2', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/office365/fail'
}));*/

router.get('/auth/office365/callback',
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/auth/office365/fail' }),
    function(req, res) {
        res.redirect(CLIENT_HOME_PAGE_URL);
    });

router.get('/dashboardUser', dashboardController.dashboard);
router.get('/dashboard/courses', dashboardController.courses);
router.get('/dashboard/favCourses', dashboardController.favCourses);

router.get('/dashboardAdminCampus', dashboardController.dashboardAdminCampus);
router.get('/manageClassroomsAdmin', admincampusController.classroomsManagement);
router.post('/classroomsAdminCampus/:id', admincampusController.updateClassroomData);
router.get('/classroomsAdminCampus/create', admincampusController.showCreateNewClassroom);
router.post('/createNewClassroom', admincampusController.createNewClassroom);
router.post('/classroomsAdminCampus/del/:id', admincampusController.deleteClassroomData);
router.get('/adminCampus/allClassrooms', admincampusController.classroomsAll)

router.post('/classroomsSearch', admincampusController.classroomsSearch);
router.get('/classroomsAdminCampus/:id', admincampusController.editClassroomInfo);




//router.get('/auth/office365/success', dashboardController.index);
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
/*
router.get('/auth/itesm/success', (req, res) => {
    res.json({
    success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
    });
});

router.get('/auth/itesm/fail', (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    })
});
*/
module.exports = router;