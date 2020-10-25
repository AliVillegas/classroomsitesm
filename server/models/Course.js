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
exports.courseAlreadyExists = (name, campusId) => {
    return knex
        .select('*')
        .from('courses')
        .where('campus_id',campusId)
        .andWhere('name', name)
        .first().then(res => {
            if (res == undefined) {
                return false

            } else {
                return true
            }
        })
}

exports.createNewCourse = (course, campusId) => { 
    return knex('courses')
        .insert({
            campus_id: campusId,
            name: course.name,
            classroom_id: course.classroom_id,
            description: course.description
        }).then((id) => {
            return knex.select('*')
                .from('courses')
                .where('id', id);
        })
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

exports.delete = (id,campusId) => {
    return knex('courses')
        .delete()
        .where('campus_id', campusId)
        .andWhere('id', id);
}