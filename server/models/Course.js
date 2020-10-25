const knex = require('../database/connection');

exports.all= (limit) => {
    return knex
        .select('*')
        .from("courses")
        .limit(limit)
}
