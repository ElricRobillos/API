const db = require("../../models");
const publication_countries = db.publication_countries;

// Create and Save a new author
exports.create_publication_countries = async (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
      res.sendStatus(403);
  }
  else{
      req.body.addedBy = req.user.userID

      req.body.updatedBy = req.user.userID
      
      db.publication_countries.create(req.body)
      .then((data) => {
          res.send({
              error: false,
              data: data,
              message: ["A publication country is added successfully."],
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

// Retrieve all publication_countries from the database.
exports.findAll_publication_countries = (req, res) => {
  publication_countries
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

// Find a single publication_countries with an id
exports.findOne_publication_countries = (req, res) => {
  const id = req.params.pubCountryId;

  publication_countries
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

// Update a publication_countries by the id in the request
exports.update_publication_countries = async (req, res) => {
  const id = req.params.pubCountryId;

  publication_countries
    .update(req.body, {
      where: { pubCountryId: id },
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success
        publication_countries.findByPk(id).then((data) => {
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

// Delete a publication country with the specified id in the request
exports.delete_publication_countries = (req, res) => {
  const id = req.params.pubCountryId;
  const body = { status: "Inactive" };
  publication_countries
    .update(body, {
      where: { pubCountryId: id },
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success
        publication_countries.findByPk(id).then((data) => {
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
