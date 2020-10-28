const knex = require('../database/connection');

exports.find = (id) => {
    return knex
        .select('*')
        .from('classes')
        .where('classId', id)
        .first();
}
exports.findSameCampus = (id,campus_id) => {
    return knex
        .select('*')
        .from('classes')
        .join('classrooms', 'classrooms.id', '=', 'classes.classroom_id')
        .join('professors', 'professors.id', '=', 'classes.professor_id')
        .where('classId', id)
        .andWhere('classrooms.campus_id',campus_id)
        .first();
}


exports.allClassesSameCampus = (campusId,limit) => {
    return knex.from('classes')
        //.select("id,course.name,classroom_id,building,professor_id,course_id,timeFromMon,timeToMon,timeFromTu,timeFromTu,timeToTu,timeFromWed,timeToWed,timeFromTh,timeToTh,timeFromFr,timeToFr,timeFromSat,timeToSat")
        .select('*')
        .from('classes')
        .join('classrooms', 'classrooms.id', '=', 'classes.classroom_id')
        .where('campus_id', campusId)
        .limit(limit)
}
exports.createNewClass= (classR) => { 
    return knex('classes')
        .insert({
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
            timeToSat:classR.timeToSat,
            course: classR.course,
            classroom_id: classR.classroom_id
        }).then((id) => {
            return knex.select('*')
                .from('classes')
                .where('classId', id);
        })
}


exports.delete = (id,campusId) => {
    return knex('classes')
        .join('classrooms', 'classroom.id', '=', 'classes.classroom_id')
        .delete('classes')
        .where('classId', id)

}

exports.findByCourseName = (campusId, name,limit) => {
    return knex
        .select("*")
        .from('classes')
        .where('campus_id', campusId)
        .andWhere('course', 'like', '%' + name + '%')
        .limit(limit)
}

exports.findAllClassesGivenClassroom= (campusId, classroom_id) =>{
    return knex
        .select("*")
        .from('classes')
        .join('classrooms', 'classroom.id', '=', 'classes.classroom_id')
        .where('campus_id', campusId)
        .andWhere('classroom_id',classroom_id)
}







