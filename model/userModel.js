const mongoose = require('mongoose');

//connect to mongodb
// mongoose.connect('mongodb://localhost:27017/diwali');

// mongoose.connection.on('connected',()=>{
//     console.log('connected to database mongodb @ 27017');
// });

// mongoose.connection.on('error',(err)=>{
//     if(err)
//     {
//         console.log('Error in Database conncetion:'+err)
//     }
// });

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(()=>{
    console.log("Database Connection Successful...")
}).catch((err)=>{
 console.log(err)
});





const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    Name:{
        type:String,
        required: true
    },
    fName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    }
});

var userData = mongoose.model('user', NewUserSchema);
module.exports = userData;
