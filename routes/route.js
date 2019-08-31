const express= require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const Food= require('../models/foods')
const User= require('../models/user')


router.get('/food',(req,res,next)=>{
    //res.send("Receive contacts");
    Food.find(function(err,foods){
        res.json(foods);
    })

})

router.post('/food',(req,res)=>{
/*    let fooddata = req.body
    let food = new Food(fooddata)
    food.save((error, foods) => {
        if (error) {
            console.log(error)
        } else {
            res.json(foods)
        }*/
    let newFood=new Food({
        id:req.body.id,
        name:req.body.name,
        price:req.body.price
        
    });
    newFood.save((err,foods)=>{
        if(err){
            res.json({msg:'Failed to add food'});
        }
        else{
            res.json({msg:'food added successfully'});
        } 
    })

})


router.delete('/food/:id',(req,res,next)=>{
    Food.remove({_id:req.params.id},function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})


function verifyToken(req,res,next){
    console.log('We are at verifyToken')
    //console.log(req.headers.authorization)
    //let authService = this.inj.get(AuthService)
    //console.log('TOKEN:',authService.getToken())
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    //let token=req.headers.authorization
    console.log('token:',token)
    if(token==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretkey')
    console.log('payload:',payload)
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()
}

router.get('/user', (req, res) => {
    User.find(function(err,users){
       res.json(users);
   })
   })


router.post('/register', (req, res) => {
    /*let userdata = req.body
    let user = new User(userdata)*/
    
     /*   bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({error:err})
            }
            else{
                let reguser=new User({
                    id:req.body.id,
                    name:req.body.name,
                    password :hash,
                    email:req.body.email,
                    phone:req.body.phone,
                    dob:req.body.dob,
                    isAdmin:req.body.isAdmin
            })
            user.save((error, reguser) => {
            if (error) {
            console.log(error)
            } 
            else {
            let payload = {subject:reguser.id}
            console.log('payload',payload);
            let token=jwt.sign(payload,'secretkey')
            console.log('token',token);
            res.status(200).send({token})
        }
    })
}
}) */

bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
        return res.status(500).json({error:err})
    }
    else{
        let reguser=new User({
            id:req.body.id,
            name:req.body.name,
            password :hash,
            email:req.body.email,
            phone:req.body.phone,
            dob:req.body.dob,
            isAdmin:req.body.isAdmin
    })
    reguser.save((error, reguser) => {
        if (error) {
        console.log(error)
        } 
        else {
        //console.log('password',password);
        let payload = {subject:reguser.id}
        console.log('payload',payload);
        let token=jwt.sign(payload,'secretkey')
        console.log('token',token);
        res.status(200).send({token})
    }
})
    }
})
})

/*
router.post('/login',(req,res)=>{
    let userdata=req.body
    User.findOne({email:userdata.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else{
                if(user.password!==userdata.password){
                    res.status(401).send('Invalid password')
                }
                else{
                    let payload = {subject:user.id}
                    let token=jwt.sign(payload,'secretkey')
                    res.status(200).send({token})
                }
            }
        }
    })
})
*/

router.post('/login',(req,res)=>{
    let userdata=req.body
    User.findOne({email:userdata.email},(error,user)=>{
        if(error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid email')
            }
            bcrypt.compare(userdata.password,user.password,(err,result)=>{
            if(err){
                res.status(401).send('Invalid password')
            }
            if(result) {
                let payload = {subject:user.id}
                let token=jwt.sign(payload,'secretkey')
                console.log('payload ',payload);
                console.log('token ',token);
               //res.status(200).send({token})
               res.status(200).json({message:'Success',user:user,token:token})
                }
                //res.status(401).json({message:'Auth failed'})
            })
        }
    })
})
        


router.get('/home',verifyToken,(req,res)=>{})

module.exports=router;