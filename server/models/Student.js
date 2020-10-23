const knex = require('../database/connection');

exports.create = (user) => {
    return knex('students')
        .insert({ user_id: user.id, name: user.name, email: user.email, campus_id: 1});
}
exports.allSameCampus = (id) => {
    return knex('students')
    .join('users', 'users.id', '=', 'students.user_id')
    .where('campus_id', id)
}
exports.findByUserID = (id) => {
    return knex
        .select('*')
        .from('students')
        .where('user_id', id)
        .first();
}