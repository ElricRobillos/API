//import modules/packages
const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/models");

//routes
const material_typesRoute = require("./src/routes/material_types.routes")
const weedingsRoute = require("./src/routes/weedings.routes")
const shelves = require("./src/routes/shelves.routes")
const languagesRoute = require("./src/routes/languages.routes");
const publishersRoute = require("./src/routes/publishers.routes");
const materialsRoute = require("./src/routes/materials.routes");

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
    .sync({ alter: true })
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

//ROUTE
app.use(`${process.env.API_VERSION}/material_types`, material_typesRoute); 
app.use(`${process.env.API_VERSION}/weedings`,weedingsRoute); 
app.use(`${process.env.API_VERSION}/shelves`, shelvesRoute); 
app.use(`${process.env.API_VERSION}/languages`, languagesRoute);
app.use(`${process.env.API_VERSION}/publishers`, publishersRoute);
app.use(`${process.env.API_VERSION}/materials`, materialsRoute);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
