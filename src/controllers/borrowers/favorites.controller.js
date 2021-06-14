const db = require("../../models");
const favorites = db.favorites;

// Added favorites of Students
exports.create_favorites = async (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.favorites.create(req.body)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: ["A Favorite is added successfully."],
            });
                
        })
        .catch((err) =>{
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            });
        });
    }
};



// Retrieve all favorites from the database.
exports.findAll_favorites  = (req, res) => {
    favorites.findAll({ where: { status: "Active"}})
    .then((data) => {
    res.send({
        error: false,
        data: data,
        message: [process.env.SUCCESS_RETRIEVED],
    });
    })
    .catch((err) => {
    res.status(500).send({
        error: true,
        data: [],
        message: err.errors.map((e) => e.message),
    });
    });
};

// Find a single favorites with an id
exports.findOne_favorites  = (req, res) => {
    const id = req.params.favoriteID; 

    favorites.findByPk(id).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err) => {
        res.status(500).send({
        error: true,
        data: [],
        message:
        err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
    });
};

// Update a favorites by the id in the request
exports.update_favorites  = async (req, res) => {
    const id = req.params.favoriteID;

    favorites.update(req.body, {
        where: { favoriteID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            favorites.findByPk(id).then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_UPDATE],
                });
            });
        } else {
            // error in updating
            res.status(500).send({
            error: true,
            data: [],
            message: ["Error in updating a record"],
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message:
            err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
        });
};

// Delete a favorites with the specified id in the request
exports.delete_favorites  = (req, res) => {
    const id = req.params.favoriteID;
    const body = { status: "Inactive" };
        favorites.update(body, {
            where: { favoriteID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            favorites.findByPk(id).then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_UPDATE],
                });
            });
        } else {
            // error in updating
            res.status(500).send({
            error: true,
            data: [],
            message: ["Error in deleting a record"],
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message:
            err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
        });
};

