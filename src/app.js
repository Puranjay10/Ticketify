const express=require("express");
const cors=require("cors");
const authRoutes=require("./routes/auth.routes");
const eventRoutes=require("./routes/event.routes");
const ticketRoutes=require("./routes/ticket.routes");

const app=express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/events",eventRoutes);
app.use("/tickets",ticketRoutes);

app.get("/",(req,res)=>{
    res.send("Ticketify API is running.");
});

module.exports=app;