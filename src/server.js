require("dotenv").config();

const http=require("http");
const app=require("./app");
const connectDB=require("./config/db");
const{initSocket}=require("./sockets/socket");

connectDB();

const server=http.createServer(app);

initSocket(server);

const PORT=process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});