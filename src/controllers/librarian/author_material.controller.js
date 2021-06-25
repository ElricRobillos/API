const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const author_material= db.author_material;

// Add new author_material
exports.add_author_material = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        author_material.create(req.body)
        .then((data) => dataResponse(res, data, 'A record is added succesfully!', 'Failed to add record'))
        .catch((err) => errResponse(res, err));
    }
};