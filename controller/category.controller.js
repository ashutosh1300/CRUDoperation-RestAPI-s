import "../model/connection.js";
import * as url from "url";

//CATEGORY SCHEMA MODEL.
import  CatModel from "../model/category.model.js";

export var save = async (req,res)=>{
    var categoryDetails = req.body
    var categorylist = await CatModel.find();
    var l = categorylist.length;
    var _id=l == 0 ? 1 : categorylist[l-1]._id+1;

    categoryDetails = {...categoryDetails,"_id":_id};
    var c = await CatModel.create(categoryDetails);
    if(c)
    return res.status(201).json({"msg":"successs"});
    else
    return res.status(500).json({err});
}

export var fetch = async(req,res)=>{
    var condition_obj = url.parse(req.url,true).query;
    var categorylist = await CatModel.find(condition_obj);
    if(categorylist.length!=0)
    return res.status(201).json(categorylist);
    else
    return res.status(500).json(categorylist);
}

export var deleteCategory = async(req,res)=>{
    var condition_obj = url.parse(req.url,true).query;
    var categorylist = await CatModel.find(condition_obj);
    
    if(categorylist.length!=0) 
    {
        let result = await CatModel.deleteMany(condition_obj); 
        if(result)
        return res.status(201).json({"msg":"success"});
        else
         return res.status(500).json({error: 'Server Error'});
        }
        else
        return res.status(404).json({error: 'Resource not found'});       
    }
    
    export var update = async(req,res)=>{
        var condition_obj = req.body;

        var categorylist = await CatModel.find({condition_obj});
        console.log(categorylist);
        if(categorylist.length!=0)
        {
            let id = condition_obj._id;
            console.log(id);
            delete condition_obj._id;
            let result = await CatModel.updateOne({_id:id},{$set : condition_obj});
            console.log(result)
            if(result)
            return res.status(201).json({"msg":"success"});
            else
             return res.status(500).json({error: 'Server Error'});
        }
        else
        return res.status(404).json({error: 'Resource not found'});
 }
