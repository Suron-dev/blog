import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";
import articleRoutes from "./routes/articleRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
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
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
}


app.use("/" , appRoutes);
app.use("/auth" , authRoutes)
app.use("/articles", articleRoutes);
app.use("/category" , categoryRoute);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
