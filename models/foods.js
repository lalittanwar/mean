const mongoose= require('mongoose');

const Schema=mongoose.Schema

const FoodSchema=new Schema({

    id:{
        type:Number,
        required:true  
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true  
    }
});

module.exports=mongoose.model('food',FoodSchema,'foods');

