const knex = require('../database/connection');

exports.create = (user) => {
    return knex('super_admins')
        .insert({ user_id: user.id });
}