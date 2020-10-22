const knex = require('../database/connection');
exports.create = (user) => {
    // Obtiene la contraseña definida por el usuario
    // Encripta la contraseña
    return knex('super_admins')
        .insert({ campus_id: 1, name: user.name, email: user.email });
}