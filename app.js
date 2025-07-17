import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";
import articleRoutes from "./routes/articleRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set("view engine", "ejs");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    return req.body._method || req.query._method;
}));
app.use(bodyParser.json());
app.use(express.static("public"));


// app.use(methodOverride(function (req, res) {
//     console.log("methodOverride called", req.body._method);
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//       return req.body._method;
//     }
//   }));


app.use("/" , appRoutes);
app.use("/articles", articleRoutes);
app.use("/category" , categoryRoute);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
