var express = require('express');
var routes = require('./routes');

var app = express();
app.set('port', process.env.PORT || 4001);


app.get('/', (req, res) => {
  res.send('Welcome to microservice world, have a fantastic time.');
});

app.use(routes);

app.listen(app.get('port'), () => console.log('Express server listening on port ' + app.get('port')));
