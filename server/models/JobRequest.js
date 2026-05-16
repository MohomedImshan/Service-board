const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:[true,"Title is required"],
            trim:true,
        },
        description:{
            type:String,
            required:[true,"Descrption is required"],
            trim:true,
        },
        category:{
            type:String,
            enum:["Plumbing","Electrical","Painting","Joinery"],
            required:true,
        },
        location:{
            type:String,
            trim:true,
            
        },
        contactName:{
            type:String,
            required:[true,"Contact name is required"],
            trim:true,
            default:"A",  
        },
        contactEmail:{
            type:String,
            required:[true,"Emmail is required"],
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email",
            ],
        },
        status:{
            type:String,
            enum:["Open","In Progress","Closed"],
            default:"Open",
        },


    },
    {
        timestamps:true,
    }
);
module.exports = mongoose.model(
    "JobRequest",
    jobRequestSchema    
);