
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, role: 'student', name:'Juan Velez', email:'L120893@tec.mx'},
        {id: 2, role: 'professor', name:'Rodrigo Vaca', email:'L4120893@tec.mx'},
        {id: 3, role: 'professor', name:'Armando Prieto', email:'L13220893@tec.mx'},
      ]);
    });
};
