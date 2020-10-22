exports.up = function(knex) {
    return knex.schema
        .createTable('campus', function(campus) {
            campus.increments('id').primary();
            campus.string('name', 255).notNullable();
            campus.timestamps(true, true);
        })
        .createTable('classrooms', function(classroom) {
            classroom.increments('id').primary();
            classroom.integer('campus_id').unsigned().notNullable().references('id').inTable('campus').onDelete('cascade');
            classroom.string('name', 255).notNullable();
            classroom.integer('capacity').notNullable();
            classroom.string('building', 255).notNullable();
            classroom.string('features', 512).notNullable();
            classroom.timestamps(true, true);
        })
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('email', 255).notNullable();
            table.string('role', 255).notNullable();
            table.timestamps(true, true);
        })
        .createTable('admins_campus', (table) => {
            table.increments('id').primary();
            table.integer('campus_id').unsigned().notNullable().references('id').inTable('campus').onDelete('cascade');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('super_admins', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('students', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('email', 255).notNullable();
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('professors', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('email', 255).notNullable();
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('admins_campus')
        .dropTable('super_admins')
        .dropTable('students')
        .dropTable('professors')
        .dropTable('classrooms')
        .dropTable('campus')
        .dropTable('users')
        
};