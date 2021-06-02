//import modules/packages
const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/models");
const jwt = require("jsonwebtoken"); 

//routes
const librarianRoute = require("./src/routes/librarian.routes");
const borrowersRoute = require("./src/routes/borrowers.routes");
const homeRoute = require("./src/routes/home.routes");

const testRoute = require("./src/routes/test.routes");
const loginRoute = require("./src/routes/login.routes.js")

//initialize app
var app = express();

//parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

//console.log(require("crypto").randomBytes(64).toString("hex"));

//get config variables
dotenv.config();

//authenticate for db connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//sync for db models
if (process.env.ALLOW_SYNC === "true") {
  db.sequelize
    .sync({ force: false})
    .then(() =>
      console.log("Done adding/updating the database on the models.")
    );
}

// all request will go here first (MIDDLEWARE)
app.use((req, res, next) => {
  console.log(req.url);
  //you can check session here
  console.log("Request has been sent to" + req.url);
  next();
});

//request, response
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Library Management System.",
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  // verify if valid ung token 
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};

// ROUTE

//FOR TEST
app.use(`${process.env.API_VERSION}/test`,  testRoute);

// Doesn't need token
app.use(`${process.env.API_VERSION}/login`, loginRoute);
app.use(`${process.env.API_VERSION}/home`, homeRoute);

// Needs token
app.use(`${process.env.API_VERSION}/librarian`, authenticateToken, librarianRoute);
app.use(`${process.env.API_VERSION}/borrowers`, authenticateToken, borrowersRoute);



//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
