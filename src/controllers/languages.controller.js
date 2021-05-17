const db = require("../models");
const languages = db.languages;

// Create and Save a new languages
exports.create = async (req, res) => {
  languages
    .create(req.body)
    .then((data) => {
      res.send({
        error: false,
        data: data,
        message: ["A language is created successfully."],
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

// Retrieve all languages from the database.
exports.findAll = (req, res) => {
  languages
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

// Find a single languages with an id
exports.findOne = (req, res) => {
  const id = req.params.languageId;

  languages
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

// Update a languages by the id in the request
exports.update = async (req, res) => {
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
    .catch((err) => {
      res.status(500).send({
        error: true,
        data: [],
        message:
          err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
      });
    });
};

// Delete a language with the specified id in the request
exports.delete = (req, res) => {
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
    .catch((err) => {
      res.status(500).send({
        error: true,
        data: [],
        message:
          err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
      });
    });
};
