const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const languages = db.languages;

// Add new language
exports.add_language = async (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
      res.sendStatus(403);
  }
  else{
      req.body.addedBy = req.user.userID

      req.body.updatedBy = req.user.userID
      
      languages.findOne({
        where: {
          language: req.body.language
        }
      })
      .then(result => {
        if (result){
            errResponse(res,'Language Already Existed')
        }
        else{
          languages.create(req.body)
          .then((data) => dataResponse(res, data, 'A language is added successfully!', 'Failed to add language'))
          .catch((err)  => errResponse(res, err));
        }
      })
      .catch((err) => errResponse(res, err));
  }
};

// Retrieve all languages
exports.view_all_languages = (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
    res.sendStatus(403);
  }
  else{
    languages.findAll()
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
  }
};

// Find specific language
exports.find_language = (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
    res.sendStatus(403);
  }
  else{
    const id = req.params.languageID;

    languages.findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
  }
};

// Update language record
exports.update_language = async (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
    res.sendStatus(403);
  }
  else{
    const id = req.params.languageID;

    languages.update(req.body, {
      where:{ 
        languageID: id 
      }
    })
    .then((result) => {
      console.log(result);
      if (result) {
        // success update
        languages.findByPk(id)
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

// Deleting language record
exports.delete_language = (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
      res.sendStatus(403);
  }
  else{
      const id = req.params.languageID;

      languages.destroy({
          where:{ 
              languageID: id 
          }
      })
      .then((result) => {
          console.log(result);
          // success delete
          if (result) {
              languages.findByPk(id)
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

// Languages Count
exports.languages_count = (req, res) => {
  languages
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
