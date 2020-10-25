const { from } = require('../database/connection');
const knex = require('../database/connection');


exports.allClassesSameCampus = (campusId,limit) => {
    return knex.from('classes')
        .select("*")
        .from('classes')
        .join('courses', 'courses.id', '=', 'classes.course_id')
        .where('campus_id', campusId)
        .limit(limit)
}
