const db = require("../../models");
const genres = db.genres;

// Create and Save a new genres
exports.create_genres = async (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
      res.sendStatus(403);
  }
  else{
      req.body.addedBy = req.user.userID

      req.body.updatedBy = req.user.userID
      
      db.genres.create(req.body)
      .then((data) => dataResponse(res, data, 'A genre is added successfully!', 'Failed to add genre'))
      .catch((err)  => errResponse(res, err));
  }
};

// Retrieve all genres from the database.
exports.findAll_genres = (req, res) => {
  genres
    .findAll({ where: { status: "Active" } })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find a single genres with an id
exports.findOne_genres = (req, res) => {
  const id = req.params.genreID;

  genres
    .findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Update a genres by the id in the request
exports.update_genres = async (req, res) => {
  const id = req.params.genreID;

  genres
    .update(req.body, {
      where: { genreID: id },
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success
        genres.findByPk(id).then((data) => {
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

// Delete a genre with the specified id in the request
exports.delete_genres = (req, res) => {
  const id = req.params.genreID;
  const body = { status: "Inactive" };
  genres
    .update(body, {
      where: { genreID: id },
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success
        genres.findByPk(id).then((data) => {
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
