/*
exports.up = function(knex) {
    return knex.schema
        .createTable('classrooms', (table) => {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('capacity', 255).notNullable();
            table.string('features', 512).notNullable();
            table.timestamps(true, true);
        });
};
*/
exports.down = function(knex) {

};

exports.up = function(knex, Promise) {

};