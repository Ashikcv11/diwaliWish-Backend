const express = require ('express')
const cors = require ('cors')
const userData = require('./model/userModel');
const nodemailer = require('nodemailer');
var app = express();

const path = require('path');
app.use(express.static(`./dist/front-end`));


app.use(cors());

// require('dotenv').config();

const bodyparser = require ('body-parser')
app.use(bodyparser.json());

// let transport = nodemailer.createTransport(options,[defaults])
// let transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//  });

app.post('/api/mail',(req, res)=>{

    var data = {
        Name:req.body.data.Name,
        fName:req.body.data.fName,
        email:req.body.data.email,
        id:req.body.data._id
    }
    console.log(data.email)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diwaliwishestoyou@gmail.com',
            pass: 'ppplcytemtgtagtq'
        }
    });

    var mailOptions = {
        from: 'diwaliwishestoyou@gmail.com',
        to: data.email,
        // to: this.data.email,
        subject: 'happy diwali',
        text: 'hii '+data.fName+' your friend '+ data.Name +' send you diwali wishes, check it   👉🏻👉🏻  ' + 'https://diwaliwishes2022.herokuapp.com/wish/' +data.id+''

    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log('email send:'+info.response);
        }
    });

});

app.post('/api/add', (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log("step4")
    console.log(req.body);
    var user = {
        Name:req.body.user.Name,
        fName:req.body.user.fName,
        email:req.body.user.email
    }

    var user = new userData(user)
    user.save().then((data)=>{console.log(data._id)
    res.send(data)
})
    console.log("new user data saved successfully...")
    // res.send(user_id);
    // console.log(user_id)
})


app.get('/api/getuser/:id',(req, res)=>{
    const userid = req.params.id;
    console.log('this is'+userid)
    userData.findById(req.params.id)
    .then((data)=>{
        res.send(data);
        console.log(data)
    });
})

app.get('/api/wishes/:id',(req, res)=>{
    const userid = req.params.id;
    // console.log('this is'+userid)
    userData.findOne({"userid":userid})
    .then((user)=>{
        res.send(user);
        console.log(user)
    });
})


app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/front-end/index.html'));
  });

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('server run at port:'+PORT);
});