const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const publication_countries = db.publication_countries;

// Add new publication country
exports.add_publication_country = async (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
      res.sendStatus(403);
  }
  else{
      req.body.addedBy = req.user.userID

      req.body.updatedBy = req.user.userID
      
      publication_countries.create(req.body)
      .then((data) => dataResponse(res, data, 'A publication country is added successfully!', 'Failed to add publication country'))
      .catch((err)  => errResponse(res, err));
  }
};

// Retrieve all publication_countries
exports.view_all_publication_countries = (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
    res.sendStatus(403);
  }
  else{
  publication_countries
    .findAll()
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
  }
};

// Find specific publication_country
exports.find_publication_country = (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
    res.sendStatus(403);
  }
  else{
    const id = req.params.pubCountryID;

    publication_countries
      .findByPk(id)
      .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
      .catch((err)  => errResponse(res, err));
  }
};

// Update publication_country record
exports.update_publication_country = async (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
    res.sendStatus(403);
  }
  else{
    const id = req.params.pubCountryID;

    publication_countries.update(req.body, {
      where:{ 
        pubCountryID: id 
      }
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success update
        publication_countries.findByPk(id)
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

// Change status of publication_country
exports.change_publication_country_status = (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
    res.sendStatus(403);
  }
  else{
    const id = req.params.pubCountryID;
    const body = { 
      status: "Inactive" 
    };
    
    publication_countries.update(body, {
      where:{ 
        pubCountryID: id 
      }
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success update
        publication_countries.findByPk(id)
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
