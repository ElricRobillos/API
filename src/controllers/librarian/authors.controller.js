const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const authors= db.authors;

// Add new author
exports.add_authors = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        authors.create(req.body)
        .then((data) => dataResponse(res, data, 'An author is added succesfully!', 'Failed to add author'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all authors
exports.view_all_authors = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        authors.findAll()
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific author
exports.find_author = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        const id = req.params.authorID; 
    
        authors
            .findByPk(id)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Update an author record
exports.update_author = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.authorID;

        authors.update(req.body, {
            where:{ 
                authorID: id 
            }
        })
        .then((result) => {
            console.log(result);
            if (result) {
                // success update
                authors.findByPk(id)
                .then((data) => {
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
        .catch((err) => errResponse(res, err));
    }
};

// Deleting authors record
exports.delete_author = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.authorID;

        authors.destroy({
            where:{ 
                authorID: id 
            }
        })
        .then((result) => {
            console.log(result);
            // success delete
            if (result) {
                authors.findByPk(id)
                .then((data) => {
                    res.send({
                        error: false,
                        data: data,
                        message: [process.env.SUCCESS_DELETE],
                    });
                });
            } else {
                // error in deleting
                res.status(500).send({
                error: true,
                data: [],
                message: ["Error in deleting a record"],
                });
            }
        })
        .catch((err) => errResponse(res, err));
    }
};

// Authors Count
exports.authors_count = (req, res) => {
    authors
        .count({
            col: 'status',
            group: ['status']
        })
        .then((result) => {
            count = {
                total: 0,
                active: 0,
                inactive: 0
            }

            result.forEach(r => {
                
                // Get total count
                count.total += r.count

                // Get all active count
                if(r.status === 'Active')   count.active   += r.count
                if(r.status === 'Inactive') count.inactive += r.count

            });

            // Respond roomd count
            res.send({ count: count });
        })
        .catch((err) => errResponse(res, err));
}