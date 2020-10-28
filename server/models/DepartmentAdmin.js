const knex = require('../database/connection');

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.find = (id) => {
    return knex
        .select('*')
        .from('department_admins')
        .where('id', id)
        .first();
}

exports.findByUserID = (id) => {
    return knex
        .select('*')
        .from('department_admins')
        .where('user_id', id)
        .first();
}

exports.create = (user) => {
    return knex('department_admins')
        .insert({ user_id: user.id, campus_id: 1 });
}

exports.delete = (id) => {
    return knex('department_admins')
        .delete()
        .where('user_id', id);
}