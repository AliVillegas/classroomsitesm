exports.up = function (knex) {
    return knex.schema
        .createTable('campus', function (campus) {
            campus.increments('id').primary();
            campus.string('name', 255).notNullable();
            campus.timestamps(true, true);
        })
        .createTable('classrooms', function (classroom) {
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
        .createTable('department_admins', (table) => {
            table.increments('id').primary();
            table.integer('campus_id').unsigned().notNullable().references('id').inTable('campus').onDelete('cascade');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('students', (table) => {
            table.increments('id').primary();
            table.integer('campus_id').unsigned().notNullable().references('id').inTable('campus').onDelete('cascade');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('professors', (table) => {
            table.increments('id').primary();
            table.integer('campus_id').unsigned().notNullable().references('id').inTable('campus').onDelete('cascade');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('classroomAlterations', (table) => {
            table.increments('id').primary();
            table.string('Edit Date time', 255).notNullable();
            table.string('description', 255).notNullable().defaultTo("");;
            table.integer('classroom_id').unsigned().notNullable().references('id').inTable('classrooms').onDelete('cascade');
            table.integer('adminCampus_id').unsigned().notNullable().references('id').inTable('admins_campus').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('courses', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('description', 255).notNullable().defaultTo("");
            table.integer('campus_id').unsigned().references('id').inTable('campus').onDelete('cascade');
            table.integer('classroom_id').unsigned().references('id').inTable('classrooms').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('courseAlterations', (table) => {
            table.increments('id').primary();
            table.string('Edit Date time', 255).notNullable();
            table.string('description', 255).notNullable().defaultTo("");;
            table.integer('classroom_id').unsigned().notNullable().references('id').inTable('classrooms').onDelete('cascade');
            table.integer('depAdmin_id').unsigned().notNullable().references('id').inTable('department_admins').onDelete('cascade');
            table.timestamps(true, true);
        })
        .createTable('classes', (table) => {
            table.increments('id').primary();
            table.time('TimeFromMon', { precision: 0 })
            table.time('TimeToMon', { precision: 0 })
            table.time('TimeFromTu', { precision: 0 })
            table.time('TimeToTu', { precision: 0 })
            table.time('TimeFromWed', { precision: 0 })
            table.time('TimeToWed', { precision: 0 })
            table.time('TimeFromTh', { precision: 0 })
            table.time('TimeToTh', { precision: 0 })
            table.time('TimeFromFr', { precision: 0 })
            table.time('TimeToFr', { precision: 0 })
            table.time('TimeFromSat', { precision: 0 })
            table.time('TimeToSat', { precision: 0 })
            table.string('course', 255)
            table.integer('classroom_id').unsigned().notNullable().references('id').inTable('classrooms').onDelete('cascade');
            table.string('description', 255).notNullable().defaultTo("");            table.integer('professor_id').unsigned().references('id').inTable('professors').onDelete('cascade');

            table.timestamps(true, true);
        })
        .createTable('favorite_classes', (table) => {
            table.increments('id').primary();
            table.integer('class_id').unsigned().notNullable().references('id').inTable('classes').onDelete('cascade');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamps(true, true);
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTable('favorite_classes')
        .dropTable('classes')
        .dropTable('courseAlterations')
        .dropTable('courses')
        .dropTable('classroomAlterations')
        .dropTable('admins_campus')
        .dropTable('department_admins')
        .dropTable('students')
        .dropTable('professors')
        .dropTable('classrooms')
        .dropTable('campus')
        .dropTable('users')

};