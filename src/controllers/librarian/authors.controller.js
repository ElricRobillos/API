const db = require("../../models");
const authors= db.authors;

// Create and Save a new authors
exports.create_authors = async (req, res) => {
    authors
        .create(req.body)
        .then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["An author is created successfully."],
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

    // Retrieve all authors from the database.
exports.findAll_authors = (req, res) => {
    authors
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