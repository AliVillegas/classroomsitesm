exports.create = (user) => {
    return knex('students')
        .insert({ user_id: user.id, name: user.name, mail: user.mail});
}