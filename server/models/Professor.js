exports.create = (user) => {
    return knex('professors')
        .insert({ user_id: user.id, name: user.name, email: user.email});
}