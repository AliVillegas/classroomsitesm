exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('classrooms').del()
        .then(function() {
            // Inserts seed entries
            return knex('classrooms').insert([
                { id: 1, campus_id: '1', name: 'F302', capacity: 20, building: 'Aulas3', features: 'AC' },
                { id: 2, campus_id: '2', name: 'M101', capacity: 10, building: 'Cedetec', features: 'Projector, Computer Lab' },
                { id: 3, campus_id: '2', name: 'M201', capacity: 15, building: 'Cedetec', features: 'Projector, Computer Lab' },
                { id: 4, campus_id: '3', name: 'M401', capacity: 10, building: 'Aulas2', features: 'AC' },
                { id: 5, campus_id: '1', name: 'F201', capacity: 10, building: 'Aulas3', features: 'Wheelchair entrance' },

            ]);
        });
};