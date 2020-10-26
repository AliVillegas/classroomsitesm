exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('professors').del()
  /*
      .then(function() {
          // Inserts seed entries
          return knex('professors').insert([
              { id: 2,name: 'Alberto Quinto', email:'L01233@itesm.mx', campus_id: 1, user_id:1},
              { id: 3,name: 'Antonio Regalado ', email:'L01234@itesm.mx',campus_id: 1, user_id:1 },
              { id: 4,name: 'Beto Machado ', email:'L01235@itesm.mx',campus_id: 1, user_id:1 },
              { id: 5,name: 'Adrián Díaz', email:'L01236@itesm.mx',campus_id: 1, user_id:1 },
          ]);
      });*/
};
 