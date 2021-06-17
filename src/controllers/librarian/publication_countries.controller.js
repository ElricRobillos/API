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
      .then((data) => dataResponse(res, data, 'A publication country is added successfully!', 'Failed to add publication country'))
      .catch((err)  => errResponse(res, err));
  }
};

// Retrieve all publication_countries from the database.
exports.findAll_publication_countries = (req, res) => {
  publication_countries
    .findAll({ where: { status: "Active" } })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));;
};

// Find a single publication_countries with an id
exports.findOne_publication_countries = (req, res) => {
  const id = req.params.pubCountryId;

  publication_countries
    .findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
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
    .catch((err)  => errResponse(res, err));
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
    .catch((err)  => errResponse(res, err));
};
