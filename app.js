var express= require('express');
var mongoose= require('mongoose');
var bodyparser= require('body-parser');
var cors= require('cors');
//var path= require('path');

var app=express();

const route=require('./routes/route');

// const db = "mongodb://lalit111:vicky111@ds111765.mlab.com:11765/loginapi"
// mongoose.connect(db, { useNewUrlParser: true }, err => {
//     if (err) {
//         console.error('Error' + err)
//     } else {
//         console.log('connceted to mongoDb')
//     }
// })

mongoose.connect('mongodb://localhost:27017/foodlist',{useNewUrlParser: true });

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
    if(err){
    console.log('Error in connection : '+err);
    }
});

const port=process.env.PORT || 8080;

app.use(cors());

app.use(bodyparser.json());

//app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);

app.get('/',(req,res)=>{
    res.send('Response');
})

app.listen(port,()=>{
console.log('Server started at port : '+port);
});