
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('professors').del()
    .then(function () {
      // Inserts seed entries
      return knex('professors').insert([
        {id: 1, campus_id: 1, user_id: 2},
        {id: 2, campus_id: 1, user_id: 3},       
      ]);
    });
};
