const knex = require('../database/connection');

exports.all= (limit) => {
    return knex
        .select('*')
        .from("courses")
        .limit(limit)
}
exports.find = (id) => {
    return knex
        .select('*')
        .from('courses')
        .where('id', id)
        .first();
}

exports.update = (id, course) => {
    return knex('courses')
        .update(course)
        .update('updated_at', knex.fn.now())
        .where('id', id)
        .then(() => {
            return knex.select('*')
                .from('courses')
                .where('id', id);
        })

}

