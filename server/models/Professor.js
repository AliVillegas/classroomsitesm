const knex = require('../database/connection');

exports.create = (user) => {
    return knex('professors')
        .insert({ user_id: user.id, campus_id: 1 });
}
exports.allSameCampus = (id) => {
    return knex('users')
        .join('professors', 'users.id', '=', 'professors.user_id')
        .where('campus_id', id)

}
exports.findByUserID = (id) => {
    return knex
        .select('*')
        .from('users')
        .join('professors', 'users.id', '=', 'professors.user_id')
        .where('user_id', id)
        .andWhere('campus_id', id)
        .first();
}

exports.delete = (id) => {
    return knex('professors')
        .delete()
        .where('user_id', id);
}