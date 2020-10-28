const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
const consts = require('../constants')
const StudentModel = require('./Student')
const ProfessorModel = require('./Professor')
const AdminModel = require('./CampusAdmin')
const AdminDepModel = require('./DepartmentAdmin')

exports.all = (limit) => {
    return knex
        .select('*')
        .from("users")
        .limit(limit)

}
exports.updateRole = async(id, role) => {
        const user = await knex.select('*')
            .from('users')
            .where('id', id)
            .first();

        const currentRole = user.role;
        if (currentRole === "student") {
            await StudentModel.delete(id)
        } else if (currentRole === "professor") {
            await ProfessorModel.delete(id)
        } else if (currentRole === "admin") {
            await AdminModel.delete(id)
        } else if (currentRole === "adminDep") {
            await AdminDepModel.delete(id)
        }

        if (role === "student") {
            await StudentModel.create(user)
        } else if (role === "professor") {
            await ProfessorModel.create(user)
        } else if (role === "admin") {
            await AdminModel.create(user)
        } else if (role === "adminDep") {
            await AdminDepModel.create(user)
        }

        return knex
            .select('*')
            .from('users')
            .where('id', id)
            .update('role', role)
            .then(() => {
                return knex.select('*')
                    .from('users')
                    .where('id', id);
            })
    }
    /**
     * Encuentra al usuario que tenga el correo indicado
     */
exports.find = (id) => {
    return knex
        .select('*')
        .from('users')
        .where('id', id)
        .first();
}

/* exports.attachSessionId = (id) => {
    return knex
        .select('*')
        .from('users')
        .where('id', id)
        .first()
        .update('sessionId', '')
} */

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = (email) => {
    return knex
        .select('*')
        .from('users')
        .where('email', email)
        .first();
}


exports.findOrCreate = (user) => {
    // Obtiene la contraseña definida por el usuario
    let email = user.email
    return knex
        .select('*')
        .from('users')
        .where('email', email)
        .first().then(res => {

            if (res == undefined) {
                let pass = user.password;
                // Encripta la contraseña
                pass = bcrypt.hashSync(pass, 10);
                return knex('users')
                    .insert({ name: user.name, email: user.email, role: consts.campusAdmin });

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