let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserModel = require('../models/User');
let AdminCampusModel = require('../models/CampusAdmin');
let SuperAdminModel = require('../models/DepartmentAdmin');
let StudentModel = require('../models/Student');
let ProfessorModel = require('../models/Professor');

let officeStrategy = require('passport-azure-ad-oauth2')
let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



const verifyCallback = (email, password, done) => {
    UserModel.findByEmail(email)
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            let isValid = bcrypt.compareSync(password, user.password);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
}
passport.use(new officeStrategy({
        clientID: process.env.AzureOAuth_ClientId,
        clientSecret: process.env.AzureOAuth_ClientSecret,
        tenantId: process.env.AzureOAuth_AppTenantId,
        resource: process.env.AzureOAuth_AuthResource,
        callbackURL: process.env.AzureOAuth_CallbackURL,
        state: true,
        pkce: true,
        //user: AzureOAuth_User,
        proxy: {
            host: 'myProxyHost',
            port: 'myProxyPort',
            protocol: 'http' // http / https
        }
    },

    function(accessToken, refresh_token, params, profile, done) {
        console.log("PROFILE")
            //console.log(profile)
        var waadProfile = jwt.decode(params.id_token, '', true);
        console.log(waadProfile)
        UserModel.findOrCreate({ name: waadProfile.name, email: waadProfile.upn, password: waadProfile.upn })
            .then((id) => {
                if (id.hasOwnProperty('email')) {
                    console.log("ID HAS email", id)
                    return UserModel.findByEmail(id.email)
                        .then(user => done(null, user))
                } else {
                    return UserModel.find(id)
                        .then(user => {
                            AdminCampusModel.create(user).then(newUser => {
                                console.log("CreatedAdminCampus")
                                console.log(user)
                                SuperAdminModel.create(user).then(newUser => {
                                    if(user.email.charAt(0).toLowerCase() === 'a'){
                                        StudentModel.create(user).then(newUser => {
                                            done(null, user)
                                            //update user role to student
                                        })
                                    }
                                    else if (user.email.charAt(0).toLowerCase() === 'l'){
                                        ProfessorModel.create(user).then(newUser => {
                                            done(null, user)
                                            //update user role to professor
                                        })

                                    }
                                })

                            })
                        }
                            
                        )
                }
            });

    }));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.find(id)
        .then((user) => {
            done(null, user);
        })
        .catch(e => {
            done(new Error("Failed to deserialize an user"));
        });
});