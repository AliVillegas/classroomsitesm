
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, role: 'student', name:'Juan Velez', email:'L120893@tec.mx'},
        {id: 2, role: 'professor', name:'Rodrigo Vaca', email:'L2423453@tec.mx'},
        {id: 3, role: 'professor', name:'Sofía Correa ', email:'L123430893@tec.mx'},
        {id: 4, role: 'professor', name:'Luna Alma ', email:'L1765767693@tec.mx'},
        {id: 5, role: 'student', name:'Saúl Neri Ortiz ', email:'L1888893@tec.mx'},
        {id: 6, role: 'student', name:'Kai Kawasaki', email:'L2346575893@tec.mx'},
        {id: 7, role: 'admin', name:'Santiago Bárcenas', email:'L655420893@tec.mx'},
        {id: 8, role: 'professor', name:'Rodrigo Luna', email:'L4120893@tec.mx'},
        {id: 9, role: 'professor', name:'María Fuentes ', email:'L76220893@tec.mx'},
        {id: 10, role: 'professor', name:'Johnny Kent ', email:'L76720893@tec.mx'},
      ]);
    });
};
