const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const genres = db.genres;

// Add new genre
exports.add_genre = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        genres.create(req.body)
        .then((data) => dataResponse(res, data, 'A genre is added successfully!', 'Failed to add genre'))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all genres
exports.view_all_genres = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        genres.findAll()
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific genre
exports.find_genre = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.genreID;

        genres.findByPk(id)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Update genre record
exports.update_genre = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.genreID;

        genres.update(req.body, {
            where:{ 
            genreID: id 
            }
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success update
            genres.findByPk(id)
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
        .catch((err)  => errResponse(res, err));
    }
};

// Change status of genre
exports.change_genre_status = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.genreID;
        const body = { 
        status: "Inactive" 
        };

        genres.update(body, {
            where:{ 
                genreID: id 
            }
            })
        .then((result) => {
        console.log(result);
        if (result) {
        // success update
            genres.findByPk(id)
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.STATUS_UPDATE],
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
    }
};

// Genres Count
exports.genres_count = (req, res) => {
    genres
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
