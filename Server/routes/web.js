const router = require('express').Router();

const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const authValidator = require('../validators/AuthValidators');
const homepageController = require('../controllers/HomepageController');
const dashboardController = require('../controllers/DashboardController');
const admincampusController = require('../controllers/AdminCampusController');

const passport = require('passport');

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
router.get('/auth/office365/callback', passport.authenticate('azure_ad_oauth2', {
    successRedirect: '/auth/office365/success',
    failureRedirect: '/auth/office365/fail'
}));
router.get('/auth/itesm/login', passport.authenticate('azure_ad_oauth2'));
router.get('/auth/itesm/logout', dashboardController.logout);
router.get('/auth/itesm/callback', passport.authenticate('azure_ad_oauth2', {
    successRedirect: '/auth/itesm/success',
    failureRedirect: '/auth/itesm/fail'
}));
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
    res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
    });
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