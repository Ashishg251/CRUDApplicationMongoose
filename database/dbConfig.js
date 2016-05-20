var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/studentDB');
var schema = mongoose.Schema;

var studentSchema = new schema({
    _id : String,
    Name : String,
    EmailId : String,
    ContactNo : String
}, {collection : "studentCollection"});

module.exports = {
    studentModel : db.model("Student", studentSchema)
};