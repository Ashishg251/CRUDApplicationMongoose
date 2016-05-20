var express = require('express');
var app = express();
var path = require('path');
var Student = require('./database/dbConfig.js').studentModel;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/students', function(req, res) {
    Student.find(function(err, doc) {
        res.json(doc);
    });
})

app.put('/students', function(req, res) {
    console.log(req.body.ContactNo);
    var newStudent = new Student();
    newStudent._id = mongoose.Types.ObjectId();
    newStudent.Name = req.body.Name;
    newStudent.EmailId = req.body.EmailId;
    newStudent.ContactNo = req.body.ContactNo;
    newStudent.save(function(err) {
        if (err){
            console.log('error : '+err);
            throw err;
        } else {
            console.log('new Student saved');
        }
    });
    res.end();
})

app.delete('/students/:id=?', function(req, res) {
    console.log(req.params.id);
    Student.remove({_id : req.params.id}, function(err, doc) {
        res.json(doc);
    });
});

app.get('/students/:id=?', function(req, res) {
    Student.findOne({_id : req.params.id}, function(err, doc) {
        res.json(doc);
    });
});

app.put('/students/:id=?', function(req, res) {
    console.log(req.params.id);
    console.log(req.body);
    Student.update(
        {"_id" : req.params.id},
        {$set: {Name: req.body.Name, EmailId: req.body.EmailId, ContactNo: req.body.ContactNo}},    
        {multi:true}, 
        function (err, doc) {
            res.json(doc);
    });
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/main.html'));
});

app.listen(3000, '0.0.0.0', function() {
    console.log("Listening on port number 3000");
});