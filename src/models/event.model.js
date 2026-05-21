const mongoose=require("mongoose");

const eventSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },

        description:{
            type:String,
        },

        date:{
            type: Date,
            required:true,
        },
        venue:{
            type:String,
            required:true,
        },

        totalSeats:{
            type:Number,
            required:true,         
        },

        availableSeats:{
            type:Number,
            required:true,
        },

        organizerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        banner:{
            type: String, //URL
        },
    },
    {
        timestamps:true,
    }
);

module.exports=mongoose.model("Event",eventSchema);