var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure
    ;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('homeapidb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'homeapidb' database");
        db.collection('rooms', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'rooms' collection doesn't exist.");
                //populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving room: ' + id);
    db.collection('rooms', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('rooms', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var room = req.body;
    console.log('Adding room: ' + JSON.stringify(room));
    db.collection('rooms', function(err, collection) {
        collection.insertOne(room, {safe:true}, function(error, result) {
            if (error) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result.ops[0]));
                res.send(result.ops[0]);
            }
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var room = req.body;
    console.log('Updating room: ' + id);
    console.log(JSON.stringify(room));
    db.collection('rooms', function(err, collection) {
        db.collection.update({'_id':new BSON.ObjectID(id)}, room, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating room: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(room);
            }
        });
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting room: ' + id);
    db.collection('rooms', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
