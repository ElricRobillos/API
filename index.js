//import modules/packages
const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/models");

//routes
const usersRoute = require("./src/routes/users.routes");
const material_typesRoute = require("./src/routes/material_types.routes");
const weedingsRoute = require("./src/routes/weedings.routes");
const shelvesRoute = require("./src/routes/shelves.routes");
const languagesRoute = require("./src/routes/languages.routes");
const publishersRoute = require("./src/routes/publishers.routes");
const materialsRoute = require("./src/routes/materials.routes");
const copiesRoute = require("./src/routes/copies.routes");
const materials_borrow_recordsRoute = require("./src/routes/materials_borrow_records.routes");
const favoritesRoute = require("./src/routes/favorites.routes");
const genresRoute = require("./src/routes/genres.routes");
const publication_countriesRoute = require("./src/routes/publication_countries.routes");
const author_detailsRoute = require("./src/routes/author_details.routes");
const buildingsRoute = require("./src/routes/buildings.routes");
const roomsRoute = require("./src/routes/rooms.routes");
const transactionsRoute = require("./src/routes/transactions.routes");

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
app.use(`${process.env.API_VERSION}/users`, usersRoute);
app.use(`${process.env.API_VERSION}/material_types`, material_typesRoute);
app.use(`${process.env.API_VERSION}/weedings`, weedingsRoute);
app.use(`${process.env.API_VERSION}/shelves`, shelvesRoute);
app.use(`${process.env.API_VERSION}/languages`, languagesRoute);
app.use(`${process.env.API_VERSION}/publishers`, publishersRoute);
app.use(`${process.env.API_VERSION}/materials`, materialsRoute);
app.use(`${process.env.API_VERSION}/copies`, copiesRoute);
app.use(
  `${process.env.API_VERSION}/materials_borrow_records`,
  materials_borrow_recordsRoute
);
app.use(`${process.env.API_VERSION}/favorites`, favoritesRoute);
app.use(`${process.env.API_VERSION}/genres`, genresRoute);
app.use(
  `${process.env.API_VERSION}/publication_countries`,
  publication_countriesRoute
);
app.use(`${process.env.API_VERSION}/author_details`, author_detailsRoute);
app.use(`${process.env.API_VERSION}/buildings`, buildingsRoute);
app.use(`${process.env.API_VERSION}/rooms`, roomsRoute);
app.use(`${process.env.API_VERSION}/transactions`, transactionsRoute);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
