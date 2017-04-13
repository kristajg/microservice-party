var express = require('express');
var router = express.Router();
var seneca = require('seneca')();

seneca.use('./microservices');

router.get('/users/list', (req, res) => {
  seneca.act({role: 'users', cmd: 'getAllUsers'}, (err, result) => {
    if (err) return console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result[0], null, 2));
  });
});

router.get('/users/:userId', (req, res) => {
  seneca.act({role: 'users', cmd: 'getUserById', userId: req.params.userId}, (err, result) => {
    if (err) return console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result[0], null, 2));
  });
});

router.get('/math-party', (req, res) => {
  seneca.act({role: 'math', cmd: 'sum', left: 4.5, right: 2.5, integer: true}, (err, result) => {
    if (err) return console.error(err);
    console.log('add answer ', result.answer);
  })
  .act({role: 'math', cmd: 'multiply', left: 3, right: 4}, (err, result) => {
    if (err) return console.error(err);
    console.log('multiply answer ', result.answer);
  });

  res.send(`Maths have been completed successfully, please check console and celebrate.`);
});

module.exports = router;
