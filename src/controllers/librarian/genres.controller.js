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
      .then((data) => {
          res.send({
              error: false,
              data: data,
              message: ["A genre is added successfully."],
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

// Retrieve all genres from the database.
exports.findAll_genres = (req, res) => {
  genres
    .findAll({ where: { status: "Active" } })
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

// Find a single genres with an id
exports.findOne_genres = (req, res) => {
  const id = req.params.genreID;

  genres
    .findByPk(id)
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
        message:
          err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
      });
    });
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
    .catch((err) => {
      res.status(500).send({
        error: true,
        data: [],
        message:
          err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
      });
    });
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
    .catch((err) => {
      res.status(500).send({
        error: true,
        data: [],
        message:
          err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
      });
    });
};
