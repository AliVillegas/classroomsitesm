exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('campus').del()
        .then(function() {
            // Inserts seed entries
            return knex('campus').insert([
                { id: 1, name: 'CCM' },
                { id: 2, name: 'CEM' },
                { id: 3, name: 'Santa Fe' }
            ]);
        });
};