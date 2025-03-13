require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");

// to get the json data in express app.

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = 5000;


connectDB().then(()=>{ 

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
}); 


