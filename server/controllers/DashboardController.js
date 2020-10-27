exports.index = (req, res) => {
    res.redirect('/dashboardAdminCampus')
}

exports.dashboard = (req, res) => {
    console.log("USER")
    console.log(req.user)
    if (req.user != null) {
        res.render('dashboard/mainDashboard', {
            name: req.user.name,
            email: req.user.email
        });
    } else {
        res.redirect('/')
    }
}

exports.dashboardAdminCampus = (req, res) => {
    console.log("USER")
    //console.log(req.user)
    if (req.user != null && req.user.role == 'admin') {
        res.render('dashboard/adminCampusDashboard', {
            name: req.user.name,
            email: req.user.email
        });
    } else {
        res.redirect('/')
    }
}
exports.courses = (req, res) => {
    console.log("USER")
    console.log(req.user)
    if (req.user != null) {
        res.render('courses/coursesView', {
            name: req.user.name,
            email: req.user.email
        });
    } else {
        res.redirect('/')
    }
}
exports.favCourses = (req, res) => {
    console.log("USER")
    console.log(req.user)
    if (req.user != null) {
        res.render('courses/coursesFavorite', {
            name: req.user.name,
            email: req.user.email
        });
    } else {
        res.redirect('/')
    }
}

exports.logout = (req, res) => {
    console.log("USER")
    console.log(req.user)
    if (req.user != null) {
        req.session = null
        req.logout()
        res.redirect('https://login.microsoftonline.com/c65a3ea6-0f7c-400b-8934-5a6dc1705645/oauth2/logout?post_logout_redirect_uri=http://localhost:3000/');
    }
}