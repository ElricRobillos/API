const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const authors= db.authors;


// Retrieve all authors
exports.view_all_authors = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        authors.findAll({
            where:{ 
                status: "Active" 
            }
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};


// Find specific author
exports.find_author = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    } else {
        const id = req.params.authorID; 

        authors
            .findByPk(id, { where:{ status: "Active" }})
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};