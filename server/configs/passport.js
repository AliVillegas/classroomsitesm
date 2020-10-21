let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserModel = require('../models/User');
let AdminCampusModel = require('../models/CampusAdmin');

let officeStrategy = require('passport-azure-ad-oauth2')
let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


let FacebookStrategy = require('passport-facebook').Strategy;
const userTableFields = {
    usernameField: 'email',
    passwordField: 'password'
};



const verifyCallback = (email, password, done) => {
    UserModel.findByEmail(email)
        .then((user) => {
            // Si no encuentra un usuario entonces regresa falso
            if (!user) {
                return done(null, false);
            }
            // Si encuentra un usuario y coincide con la contraseña entonces
            // inicia la sesión
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

const strategy = new LocalStrategy(userTableFields, verifyCallback);
const fbConfigs = {
    clientID: process.env.PASSPORT_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.PASSPORT_FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/fb/callback',
    profileFields: ['email', 'name']
};
const fbStrategy = new FacebookStrategy(fbConfigs, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    UserModel.create({ name: profile.name.givenName, email: profile.name.givenName, password: profile.name.givenName })
        .then((id) => {
            return UserModel.find(id)
                .then(user => done(null, user))
        });
});

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
            protocol: 'https' // http / https
        }
    },

    function(accessToken, refresh_token, params, profile, done) {
        console.log("PROFILE")
        console.log(profile)
        var waadProfile = jwt.verify(params.id_token, '', true);

        console.log(waadProfile)

        UserModel.findOrCreate({ name: waadProfile.name, email: waadProfile.upn, password: waadProfile.upn })
            .then((id) => {
                if (id.hasOwnProperty('email')) {
                    console.log("ID HAS email", id)
                    return UserModel.findByEmail(id.email)
                        .then(user => done(null, user))
                } else {
                    return UserModel.find(id)
                        .then(user =>
                            AdminCampusModel.create(user).then(newUser =>
                                done(null, user))
                        )
                }
            });

    }));


passport.use(strategy);

// Guarda en las variables de sesión el id del usuario loggeado
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Obtiene el usuario
passport.deserializeUser((id, done) => {
    UserModel.find(id)
        .then((user) => {
            done(null, user);
        })
        .catch(e => {
            done(new Error("Failed to deserialize an user"));
        });
});