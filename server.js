var express = require('express'),
    bodyparser = require('body-parser'),
    room = require('./routes/rooms');

var app = express();

app.use(bodyparser.json());

app.get('/rooms', room.findAll);
app.get('/rooms/:id', room.findById);
app.post('/rooms', room.add);
app.put('/rooms/:id', room.update);
app.delete('/rooms/:id', room.delete);

app.listen(3000);
console.log('Listening on port 3000...');
