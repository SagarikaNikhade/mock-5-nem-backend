const express = require("express");
const { DashModel } = require("../models/dashboard.model");
const dashRouter = express.Router();

dashRouter.post("/add",async(req,res)=>{
    const payload=req.body;
    try{
       await DashModel.insertMany(payload);
       res.send("Data is added");
    }catch(err){
       res.send({"msg":err.message});
    }
})

dashRouter.patch("/update/:id",async(req,res)=>{
    const{id}=req.params;
    try{
       await DashModel.findByIdAndUpdate({_id:id},req.body);
       res.send("Data is updated");
    }catch(err){
        res.send({"msg":err.message});
    }
})

dashRouter.delete("/delete/:id",async(req,res)=>{
    const{id}=req.params;
    try{
       await DashModel.findByIdAndDelete({_id:id});
       res.send("Data is deleted");
    }catch(err){
        res.send({"msg":err.message});
    }
})

  dashRouter.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
       const data=await DashModel.findById(id);
       res.send(data);
    }catch(err){
        res.send({"msg":err.message});
    }
})

  dashRouter.get("/",async(req,res)=>{
        const {department,page,limit,sort}=req.query;
         console.log(department,page,limit,sort);
         let query={};
        try{
            if(department){
                query.department=department
            }
    
            let skip;
            if(page){
                skip=(page-1)*limit;
            }else{
                skip=0;
            }
            let sorting;
            if(sort=="asc"){
              sorting={salary:1};
            }
    
            if(sort=="desc"){
                sorting={salary:-1}
            }
           const data=await DashModel.find(query).sort(sorting).skip(skip).limit(limit);
           res.send(data);
        }catch(err){
            res.send({"msg":err.message});
        }
    })

module.exports = { dashRouter }