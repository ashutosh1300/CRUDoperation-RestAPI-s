import express from "express";
import bodyParser from "body-parser";


const app = express();
import UserRouter from "./router/user.router.js";
import categoryRouter from "./router/category.router.js";

//configuration to extract request body content 
app.use(bodyParser());
// app.use(express.json());

app.use("/user",UserRouter);
app.use("/category",categoryRouter);

app.listen(3000);
console.log("server started at http://localhost:3000");


// https://www.edureka.co/blog/what-is-rest-api/ (REST-API explain kra h ache se)