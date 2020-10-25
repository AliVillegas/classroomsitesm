const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
const consts = require('../constants')

exports.all = (limit) => {
    return knex
        .select('*')
        .from("users")
        .limit(limit)

}
exports.updateRole = (id, role) => {
    return knex
        .select('*')
        .from('users')
        .where('id', id)
        .update('role', role)
        .then(() => {
            return knex.select('*')
                .from('users')
                .where('id', id);
        })
}
/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.find = (id) => {
    return knex
        .select('*')
        .from('users')
        .where('id', id)
        .first();
}

/* exports.attachSessionId = (id) => {
    return knex
        .select('*')
        .from('users')
        .where('id', id)
        .first()
        .update('sessionId', '')
} */

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = (email) => {
    return knex
        .select('*')
        .from('users')
        .where('email', email)
        .first();
}


exports.findOrCreate = (user) => {
    // Obtiene la contraseña definida por el usuario
    let email = user.email
    return knex
        .select('*')
        .from('users')
        .where('email', email)
        .first().then(res => {

            if (res == undefined) {
                let pass = user.password;
                // Encripta la contraseña
                pass = bcrypt.hashSync(pass, 10);
                return knex('users')
                    .insert({ name: user.name, email: user.email, role: consts.campusAdmin });

            } else {
                return res
            }


        })

}

/**
 * Crea al usuario con los datos definidos dentro del objeto user
 */
exports.create = (user) => {
    // Obtiene la contraseña definida por el usuario
    let pass = user.password;
    // Encripta la contraseña
    pass = bcrypt.hashSync(pass, 10);
    return knex('users')
        .insert({ name: user.name, email: user.email, password: pass });
}