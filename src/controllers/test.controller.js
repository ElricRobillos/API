const db = require("../models");
const bcrypt = require("bcrypt");

// create user

exports.create = async (req, res) => {
    // if (req.user == null || req.user.userType != 'Librarian'){
    //     res.sendStatus(403);
    // }
    // else{
    //     req.body.addedBy = req.user.userID

    //     req.body.updatedBy = req.user.userID

    //     req.body.password = await bcrypt.hash(
    //         req.body.password, 
    //         parseInt(process.env.SALT_ROUND)
    //     );
        
        db.users.create(req.body)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: ["A User is created successfully."],
            });
                
        })
        .catch((err) =>{
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            });
        });
    // }

};




// const usersRoute = require("./src/routes/users.routes");
// const material_typesRoute = require("./src/routes/material_types.routes");
// const weedingsRoute = require("./src/routes/weedings.routes");
// const shelvesRoute = require("./src/routes/shelves.routes");
// const languagesRoute = require("./src/routes/languages.routes");
// const publishersRoute = require("./src/routes/publishers.routes");
// const materialsRoute = require("./src/routes/materials.routes");
// const copiesRoute = require("./src/routes/copies.routes");
// const materials_borrow_recordsRoute = require("./src/routes/materials_borrow_records.routes");
// const favoritesRoute = require("./src/routes/favorites.routes");
// const genresRoute = require("./src/routes/genres.routes");
// const publication_countriesRoute = require("./src/routes/publication_countries.routes");
// const buildingsRoute = require("./src/routes/buildings.routes");
// const roomsRoute = require("./src/routes/rooms.routes");
// const transactionsRoute = require("./src/routes/transactions.routes");

// app.use(`${process.env.API_VERSION}/users`, authenticateToken, usersRoute);
// app.use(`${process.env.API_VERSION}/material_types`, authenticateToken, material_typesRoute);
// app.use(`${process.env.API_VERSION}/weedings`, authenticateToken, weedingsRoute);
// app.use(`${process.env.API_VERSION}/shelves`, authenticateToken, shelvesRoute);
// app.use(`${process.env.API_VERSION}/languages`, authenticateToken, languagesRoute);
// app.use(`${process.env.API_VERSION}/publishers`, authenticateToken, publishersRoute);
// app.use(`${process.env.API_VERSION}/materials`, authenticateToken, materialsRoute);
// app.use(`${process.env.API_VERSION}/copies`, authenticateToken, copiesRoute);
// app.use(`${process.env.API_VERSION}/materials_borrow_records`, authenticateToken, materials_borrow_recordsRoute);
// app.use(`${process.env.API_VERSION}/favorites`, authenticateToken, favoritesRoute);
// app.use(`${process.env.API_VERSION}/genres`, authenticateToken, genresRoute);
// app.use(`${process.env.API_VERSION}/publication_countries`, authenticateToken, publication_countriesRoute);
// app.use(`${process.env.API_VERSION}/buildings`, authenticateToken, buildingsRoute);
// app.use(`${process.env.API_VERSION}/rooms`, authenticateToken, roomsRoute);
// app.use(`${process.env.API_VERSION}/transactions`, authenticateToken, transactionsRoute);