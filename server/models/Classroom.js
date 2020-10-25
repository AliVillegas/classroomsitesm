const knex = require('../database/connection');
const bcrypt = require('bcryptjs');

/**
 * Encuentra al usuario que tenga el correo indicado
 */

exports.all = () => {
    return knex
        .select('*')
        .from("classrooms")

}

exports.allClassroomsSameCampus = (campusId,limit) => {
    return knex.from('classrooms')
        .select("*")
        .where('campus_id', campusId)
        .limit(limit)
}

exports.classroomAlreadyExists = (name, campusId) => {
    return knex
        .select('*')
        .from('classrooms')
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
exports.createNewClassroom = (classroom, campusId) => { 
    return knex('classrooms')
        .insert({
            campus_id: campusId,
            name: classroom.name,
            capacity: classroom.capacity,
            building: classroom.building,
            features: classroom.features
        });

}

exports.findById= (classroomId) => {
    return knex
        .select("*")
        .from('classrooms')
        .where('id', classroomId).first()
        //.where('name', name)
}

exports.update = (id, classroom) => {
    return knex('classrooms')
        .update(classroom)
        .update('updated_at', knex.fn.now())
        .where('id', id)
        .then(() => {
            return knex.select('*')
                .from('classrooms')
                .where('id', id);
        })
}

exports.delete = (id,campusId) => {
    return knex('classrooms')
        .delete()
        .where('campus_id', campusId)
        .andWhere('id', id);
}

















exports.allClassrooms = () => {
    return knex.from('classrooms').select("*")

}
exports.findByName = (name) => {

    return knex
        .select("*")
        .from('classrooms')
        .where('name', 'like', '%' + name + '%')
        //.where('name', name)

}
exports.findByNameSameCampusSearch = (campusId, name) => {
    return knex
        .select("*")
        .from('classrooms')
        .where('campus_id', campusId)
        .andWhere('name', 'like', '%' + name + '%')
        //.where('name', name)
}
exports.findByAnySameCampus = (campusId, name,limit) => {
    console.log("RECEIVED QUERY SEARCH: ", name)

    return knex
        .select("*")
        .from('classrooms')
        .where('campus_id', campusId)
        .andWhere(function() {
            this
                .where('name', 'like', '%' + name + '%')
                .orWhere('building', 'like', '%' + name + '%')
                .orWhere('features', 'like', '%' + name + '%')
        })
        .limit(limit)

    //.where('name', name)

}
exports.find = (id) => {

    return knex
        .select('*')
        .from('classrooms')
        .where('id', id)
        .first();
}


exports.findOrCreate = (classroom, campusId) => {
    // Obtiene la contraseña definida por el usuario
    return knex
        .select('*')
        .from('classrooms')
        .where('name', classroom.name)
        .first().then(res => {

            if (res == undefined) {
                // Encripta la contraseña
                return knex('classrooms')
                    .insert({
                        campus_id: campusId,
                        name: classroom.name,
                        capacity: classroom.capacity,
                        building: classroom.building,
                        features: classroom.features
                    });

            } else {
                return res
            }


        })

}

/**
 * Crea al usuario con los datos definidos dentro del objeto user
 */
exports.create = (user) => {
    // Obtiene la contraseña definida por el usuario
    let pass = user.password;
    // Encripta la contraseña
    pass = bcrypt.hashSync(pass, 10);
    return knex('users')
        .insert({ name: user.name, email: user.email, password: pass });
}



exports.delete = (id) => {
    return knex('classrooms')
        .delete()
        .where('id', id);
}