exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('classes').del()
        .then(function () {
            // Inserts seed entries
            return knex('classes').insert([
                { classId: 1, course: 'Physics II', classroom_id: 1, professor_id:1 ,schedule:'[["2021-01-11T14:30:00.000Z","2021-01-11T16:30:00.000Z"],["2021-01-15T14:30:00.000Z","2021-01-15T16:30:00.000Z"]]'},
                { classId: 2, course: 'Ethics III', classroom_id: 5 ,professor_id:1,schedule:'[["2021-01-11T8:30:00.000Z","2021-01-11T10:00:00.000Z"]]'},
                { classId: 3, course: 'Machine Learning', classroom_id: 6 ,professor_id:6, schedule:'[["2021-01-12T19:00:00.000Z","2021-01-12T21:00:00.000Z"],["2021-01-14T19:00:00.000Z","2021-01-14T21:00:00.000Z"]]'},
                { classId: 4, course: 'Machine Learning 2', classroom_id: 3,professor_id:2,schedule:'[["2021-01-12T19:00:00.000Z","2021-01-12T21:00:00.000Z"],["2021-01-14T19:00:00.000Z","2021-01-14T21:00:00.000Z"]]' },
                { classId: 5, course: 'Ethics II', classroom_id: 1 ,professor_id:5, schedule: '[["2021-01-12T19:00:00.000Z","2021-01-12T21:00:00.000Z"],["2021-01-14T19:00:00.000Z","2021-01-14T21:00:00.000Z"]]'},
                { classId: 6, course: 'Physics V', classroom_id: 1 ,professor_id:5,schedule: '[["2021-01-14T01:00:00.000Z","2021-01-14T04:00:00.000Z"]]'},
                { classId: 7, course: 'Physics VI',  classroom_id: 2 ,professor_id:5,schedule:'[["2021-01-11T8:30:00.000Z","2021-01-11T10:00:00.000Z"]]'},
                { classId: 8, course: 'Linear Algebra',  classroom_id: 2,professor_id:5, schedule: ' [["2021-01-11T14:30:00.000Z","2021-01-11T16:30:00.000Z"],["2021-01-15T14:30:00.000Z","2021-01-15T16:30:00.000Z"]]' },
            ]);
        });
};
