exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('courses').del()
      .then(function() {
          // Inserts seed entries
          return knex('courses').insert([
              { id: 1,campus_id: '1', classroom_id: '1', name: 'Physics 1'},
              { id: 2,campus_id: '1', classroom_id: '2', name: 'Physics 2'},
              { id: 3,campus_id: '3', classroom_id: '2', name: 'Physics 3'},
              { id: 4,campus_id: '2', classroom_id: '2', name: 'Physics 4'},
              { id: 5, campus_id: '1',classroom_id: '5', name: 'Math 2'},
              { id: 6, campus_id: '1',classroom_id: '5', name: 'Physics 3'},
          ]);
      });
};