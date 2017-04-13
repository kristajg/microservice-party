var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'experimental',
  },
});

module.exports = function(options) {
  var seneca = this;

  // User actions
  seneca.add('role: users, cmd: getAllUsers', (msg, reply) => {
    knex.select().from('users')
    .then((users) => {
      reply(null, users);
    });
  });

  seneca.add('role: users, cmd: getUserById', (msg, reply) => {
    knex('users').where('userid', Number(msg.userId))
    .then((user) => {
      reply(null, user);
    });
  });

  // Math actions
  seneca.add({role: 'math', cmd: 'sum', integer: true}, (msg, reply) => {
    const sum = Math.floor(msg.left) + Math.floor(msg.right);
    reply(null, {answer: sum});
  });

  seneca.add('role: math, cmd: multiply', (msg, reply) => {
    reply(null, {answer: (msg.left * msg.right)});
  });
};
