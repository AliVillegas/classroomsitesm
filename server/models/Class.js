const { from } = require('../database/connection');
const knex = require('../database/connection');

exports.find = (id) => {
    return knex
        .select('*')
        .from('classes')
        .where('id', id)
        .first();
}

exports.allClassesSameCampus = (campusId,limit) => {
    return knex.from('classes')
        .select("*")
        .from('classes')
        .join('courses', 'courses.id', '=', 'classes.course_id')
        .where('campus_id', campusId)
        .limit(limit)
}
exports.createNewClass= (classR) => { 
    return knex('classes')
        .insert({
            course_id: classR.course_id,
            timeFromMon: classR.timeFromMon,
            timeToMon:classR.timeToMon ,
            timeFromTu :classR.timeFromTu,
            timeToTu:classR.timeToTu,
            timeFromWed: classR.timeFromWed,
            timeToWed:classR.timeToWed,
            timeFromTh:classR.timeFromTh ,
            timeToTh:classR.timeToTh,
            timeFromFr: classR.timeFromFr,
            timeToFr:classR.timeToFr ,
            timeFromSat:classR.timeFromSat,
            timeToSat:classR.timeToSat
        }).then((id) => {
            return knex.select('*')
                .from('classes')
                .where('id', id);
        })
}


exports.delete = (id) => {
    return knex('classes')
        .delete()
        .where('id', id);
}

exports.findByCourseName = (campusId, name,limit) => {
    return knex
        .select("*")
        .from('classes')
        .join('courses', 'courses.id', '=', 'classes.course_id')
        .where('campus_id', campusId)
        .andWhere('courses.name', 'like', '%' + name + '%')
        .limit(limit)
}
