var express = require('express')
    ,bodyParser = require('body-parser')
    ,room = require('./routes/rooms')
    ;

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/rooms', room.findAll);
router.get('/rooms/:id', room.findById);
router.post('/rooms', room.add);
router.put('/rooms/:id', room.update);
router.delete('/rooms/:id', room.delete);

app.use('/api', router);
app.listen(3000);
console.log('Listening on port 3000...');
