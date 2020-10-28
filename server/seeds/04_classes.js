exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('classes').del()
        .then(function () {
            // Inserts seed entries
            return knex('classes').insert([
                { id: 1, course: 'Physics II', TimeFromMon: '13:30', TimeToMon: '14:30', classroom_id: 1 },
                { id: 2, course: 'Ethics III', classroom_id: 5 },
                { id: 3, course: 'Machine Learning', classroom_id: 6 },
                { id: 4, course: 'Machine Learning 2', classroom_id: 1 },
                { id: 5, course: 'Ethics II', classroom_id: 1 },
                { id: 6, course: 'Physics V', classroom_id: 1 },
                { id: 7, course: 'Physics VI', TimeFromMon: '13:30', TimeToMon: '14:30', TimeFromFr: '13:30', TimeToFr: '14:30', classroom_id: 2 },
                { id: 8, course: 'Linear Algebra', TimeFromMon: '8:30', TimeToMon: '9:30', TimeFromFr: '8:30', TimeToFr: '9:30', classroom_id: 1 },
            ]);
        });
};
