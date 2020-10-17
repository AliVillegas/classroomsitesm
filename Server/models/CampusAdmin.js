const knex = require('../database/connection');

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.find = (id) => {
    return knex
        .select('*')
        .from('admins_campus')
        .where('id', id)
        .first();
}

exports.findByUserID = (id) => {
    return knex
        .select('*')
        .from('admins_campus')
        .where('user_id', id)
        .first();
}

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = (email) => {
    return knex
        .select('*')
        .from('admins_campus')
        .where('email', email)
        .first();
}


exports.findOrCreate = (user) => {
    // Obtiene la contraseña definida por el usuario
    let email = user.email
    return knex
        .select('*')
        .from('admins_campus')
        .where('email', email)
        .first().then(res => {

            if (res == undefined) {
                return knex('admins_campus')
                    .insert({ campus_id: 1, name: user.name, email: user.email });

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
    // Encripta la contraseña
    return knex('admins_campus')
        .insert({ campus_id: 1, user_id: user.id });
}