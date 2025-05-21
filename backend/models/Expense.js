const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ExpenseSchema=new Schema({
user:{type:Schema.Types.ObjectId,
    ref:'User',
    required:true
},
title:{
    type:String,
    required:true,
},
amount:{
    type:Number,
    required:true,
},
category:{
    type:String,
    required:true,
},
date:{
    type:Date,
    default:Date.now,
},

},{timestamps:true});
module.exports=mongoose.model('Expense',ExpenseSchema);