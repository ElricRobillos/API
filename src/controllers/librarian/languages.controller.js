const db = require("../../models");
const languages = db.languages;

// Create and Save a new author
exports.create_languages = async (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
      res.sendStatus(403);
  }
  else{
      req.body.addedBy = req.user.userID

      req.body.updatedBy = req.user.userID
      
      db.languages.create(req.body)
      .then((data) => dataResponse(res, data, 'A language is added successfully!', 'Failed to add language'))
      .catch((err)  => errResponse(res, err));
  }
};

// Retrieve all languages from the database.
exports.findAll_languages = (req, res) => {
  languages
    .findAll({ where: { status: "Active" } })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find a single languages with an id
exports.findOne_languages = (req, res) => {
  const id = req.params.languageId;

  languages
    .findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Update a languages by the id in the request
exports.update_languages = async (req, res) => {
  const id = req.params.languageId;

  languages
    .update(req.body, {
      where: { languageId: id },
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success
        languages.findByPk(id).then((data) => {
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

// Delete a language with the specified id in the request
exports.delete_languages = (req, res) => {
  const id = req.params.languageId;
  const body = { status: "Inactive" };
  languages
    .update(body, {
      where: { languageId: id },
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success
        languages.findByPk(id).then((data) => {
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
