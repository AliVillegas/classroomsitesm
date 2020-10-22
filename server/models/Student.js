const knex = require('../database/connection');

exports.create = (user) => {
    return knex('students')
        .insert({ user_id: user.id, name: user.name, email: user.email});
}