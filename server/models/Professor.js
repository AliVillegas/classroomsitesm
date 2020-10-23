const knex = require('../database/connection');

exports.create = (user) => {
    return knex('professors')
        .insert({ user_id: user.id, name: user.name, email: user.email, campus_id: 1});
}
exports.allSameCampus = (id) => {
    return knex('professors')
    .join('users', 'users.id', '=', 'professors.user_id')
    .where('campus_id', id)

}
exports.findByUserID = (id) => {
    return knex
        .select('*')
        .from('professors')
        .where('user_id', id)
        .first();
}