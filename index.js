/**
 * ====================================================================
 * * MODULES & PACKAGES
 * ====================================================================
 */
const express = require('express');
const dotenv  = require('dotenv');
const jwt     = require('jsonwebtoken'); 
const cors    = require('cors');
const path    = require('path')
const db      = require('./src/models');

/**
 * ====================================================================
 * * APP INITIALIZATION AND CONFIGURATIONS
 * ====================================================================
 */

// Initialize app
var app = express();

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use cors to connect to the web
app.use(cors());

//console.log(require("crypto").randomBytes(64).toString("hex"));

// Initialize dotenv coniguration
dotenv.config();


/**
 * ====================================================================
 * * MIDDLEWARES
 * ====================================================================
 */

// All requests will go here first (MIDDLEWARE)
app.use((req, res, next) => {

  // Log request
  if(process.env.ENABLE_REQUEST_LOGS === 'true') console.log("Request has been sent to" + req.url);
  next();
});

// Get all material images
app.use(`${process.env.API_VERSION}/materials`, express.static(path.join(__dirname + '/public/images/materials/')))

/**
 * ====================================================================
 * * TOKEN AUTHENTICATION
 * ====================================================================
 */

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  // Verify if token is valid
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};


/**
 * ====================================================================
 * * ROUTES
 * ====================================================================
 */

// Connection Status
app.get(`${process.env.API_VERSION}`, (req, res) => res.send({ status: 'Connected'}));

// Import routes
const librarianRoute = require("./src/routes/librarian.routes");
const borrowersRoute = require("./src/routes/borrowers.routes");
const homeRoute      = require("./src/routes/home.routes");
const testRoute      = require("./src/routes/test.routes");

// Test route
app.use(`${process.env.API_VERSION}/test`,  testRoute);

// Home Route
app.use(`${process.env.API_VERSION}/home`, homeRoute);

// Authorized Routes
app.use(`${process.env.API_VERSION}/librarian`, authenticateToken, librarianRoute);
app.use(`${process.env.API_VERSION}/borrower`, authenticateToken, borrowersRoute);



/**
 * ====================================================================
 * * DATABASE CONFIGURATION
 * ====================================================================
 */

// Port
const PORT = process.env.PORT || 5000;

const DB_CONN_SUCCESS_MSG = `
======================================================================
[LMS-API] Database Connection has been established successfully!  
[LMS-API] Waiting to sync models...
======================================================================                        
`;

const DB_CONN_FAILED_MSG = (err) => { 
  return `
======================================================================
[LMS-API] Oops! There was an error while trying to connect to the 
          database.
----------------------------------------------------------------------                      
${err}
======================================================================
`;
}

const SYNC_SUCCESS_MSG = `
======================================================================
[LMS-API] Execution is successful!
[LMS-API] Server is running on port ${PORT}.
======================================================================
`;

// Authenticate Database Connection
db.sequelize
  .authenticate()
  .then(() => {
    if(process.env.ENABLE_DB_LOGS === 'true') console.log(`\x1b[36m%s\x1b[0m`, DB_CONN_SUCCESS_MSG);
    
    // Sync Database Models
    db.sequelize
      .sync({
        force: process.env.SEQUELIZE_FORCE_SYNC === 'true' || false,
        alter: process.env.SEQUELIZE_ALTER_SYNC === 'true' || false,
        sync:  process.env.SEQUELIZE_ALLOW_SYNC === 'true' || false,
      })
      .then(() => app.listen(PORT, () => console.log(`\x1b[32m%s\x1b[0m`, SYNC_SUCCESS_MSG)))
      .catch((err) => console.error(`\x1b[31m%s\x1b[0m`, DB_CONN_FAILED_MSG(err)));
  })
  .catch((err) => console.error(`\x1b[31m%s\x1b[0m`, DB_CONN_FAILED_MSG(err)));
