const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'knex_teste' //aqui vai o nome da database que será usada.
    }
});
  
module.exports = knex;