const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    user : {type : Types.ObjectId, ref: 'user'},
    date : Date,
    title : String,
    description : String,
    content : Array,
    createdAt : Date
});

module.exports = model( 'journal', mySchema );