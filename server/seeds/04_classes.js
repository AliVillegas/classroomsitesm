exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('classes').del()
        .then(function () {
            // Inserts seed entries
            return knex('classes').insert([
                { classId: 1, course: 'Physics II', classroom_id: 1, professor_id:1 },
                { classId: 2, course: 'Ethics III', classroom_id: 5 ,professor_id:1},
                { classId: 3, course: 'Machine Learning', classroom_id: 6 ,professor_id:6},
                { classId: 4, course: 'Machine Learning 2', classroom_id: 1,professor_id:2 },
                { classId: 5, course: 'Ethics II', classroom_id: 1 ,professor_id:5},
                { classId: 6, course: 'Physics V', classroom_id: 1 ,professor_id:5},
                { classId: 7, course: 'Physics VI',  classroom_id: 2 ,professor_id:5},
                { classId: 8, course: 'Linear Algebra',  classroom_id: 1,professor_id:5 },
            ]);
        });
};
