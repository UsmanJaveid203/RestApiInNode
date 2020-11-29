const mongoose = require('mongoose');
require('dotenv').config();
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.Promise=global.Promise;
var formSchema =new mongoose.Schema({
    username: {type:String, 
        required: true, 
    }, 

	emails: {
        type:String, 
        required: true,
    },
    password: {
        type:String, 
        required: true
    },
    image: {type:String},
    date:{
        type: Date, 
        default: Date.now }
});

var formModel = mongoose.model('form_data_f', formSchema);
module.exports=formModel;