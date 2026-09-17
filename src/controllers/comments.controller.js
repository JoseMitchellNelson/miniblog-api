const comments=require('../repositories/comments.repository'); 
const {validateComment}=require('../utils/validation');

async function list(req,res,next){
    try{res.json(await comments.findAll());}
    catch(e){next(e);}}

async function create(req,res,next){
    try{const errors=validateComment(req.body);
        if(errors.length)return res.status(400).json({error:'Datos inválidos',details:errors});
        return res.status(201).json(await comments.create(req.body));
    }catch(e){next(e);}}

    
module.exports={list,create};
