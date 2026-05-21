const mongoose=require("mongoose");

const ticketSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true,
    },
     ticketCode: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["active", "used"],
      default: "active",
    },

    bookedAt: {
      type: Date,
      default: Date.now,
    },

    qrCode:{
        type: String,
    },
},
{
    timestamps:true,
}
);

module.exports=mongoose.model("Ticket",ticketSchema);