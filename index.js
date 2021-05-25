//import modules/packages
const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/models");
const jwt = require("jsonwebtoken"); 

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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  // verify if valid ung token 
  jwt.verify(token, process.env.TOKEN_SECRET, (err, users) => {
      console.log(users, err);
      if (err) return res.sendStatus(403);
      req.users = users;
      next();
  });
};

//doesn't need token
app.use(`${process.env.API_VERSION}/login`, loginRoute);

//ROUTE (needs token)
app.use(`${process.env.API_VERSION}/users`, authenticateToken, usersRoute);
app.use(`${process.env.API_VERSION}/material_types`, authenticateToken, material_typesRoute);
app.use(`${process.env.API_VERSION}/weedings`, authenticateToken, weedingsRoute);
app.use(`${process.env.API_VERSION}/shelves`, authenticateToken, shelvesRoute);
app.use(`${process.env.API_VERSION}/languages`, authenticateToken, languagesRoute);
app.use(`${process.env.API_VERSION}/publishers`, authenticateToken, publishersRoute);
app.use(`${process.env.API_VERSION}/materials`, authenticateToken, materialsRoute);
app.use(`${process.env.API_VERSION}/copies`, authenticateToken, copiesRoute);
app.use(`${process.env.API_VERSION}/materials_borrow_records`, authenticateToken, materials_borrow_recordsRoute);
app.use(`${process.env.API_VERSION}/favorites`, authenticateToken, favoritesRoute);
app.use(`${process.env.API_VERSION}/genres`, authenticateToken, genresRoute);
app.use(`${process.env.API_VERSION}/publication_countries`, authenticateToken, publication_countriesRoute);
app.use(`${process.env.API_VERSION}/author_details`, authenticateToken, author_detailsRoute);
app.use(`${process.env.API_VERSION}/buildings`, authenticateToken, buildingsRoute);
app.use(`${process.env.API_VERSION}/rooms`, authenticateToken, roomsRoute);
app.use(`${process.env.API_VERSION}/transactions`, authenticateToken, transactionsRoute);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
