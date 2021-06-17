const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
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
        .then((data) => dataResponse(res, data, 'A favorite is added successfully!', 'Failed to add favorite'))
        .catch((err)  => errResponse(res, err));
    }
};



// Retrieve all favorites from the database.
exports.findAll_favorites  = (req, res) => {
    favorites.findAll({ where: { status: "Active"}})
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
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
    .catch((err)  => errResponse(res, err));
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
        .catch((err)  => errResponse(res, err));

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
        .catch((err)  => errResponse(res, err));

};

