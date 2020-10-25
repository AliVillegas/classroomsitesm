exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
      .then(function() {
          // Inserts seed entries
          return knex('classes').insert([
              { id: 1,course_id: '1', classroom_id: '1', TimeFromMon: '13:30',TimeToMon: '14:30'},
              { id: 2,course_id: '1', classroom_id: '2', },
              { id: 3,course_id: '3', classroom_id: '2', },
              { id: 4,course_id: '2', classroom_id: '2', },
              { id: 5, course_id: '1',classroom_id: '5', },
              { id: 6, course_id: '1',classroom_id: '5', },
          ]);
      });
};
