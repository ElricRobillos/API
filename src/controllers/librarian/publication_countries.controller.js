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

      publication_countries.findOne({
        where: {
            country: req.body.country
        }
      })
      .then(result => {
        if (result){
            errResponse(res,'Country Already Existed')
        }
        else{
          publication_countries.create(req.body)
          .then((data) => dataResponse(res, data, 'A publication country is added successfully!', 'Failed to add publication country'))
          .catch((err)  => errResponse(res, err));
        }
      })
      .catch((err) => errResponse(res, err));
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

    publication_countries.findByPk(id,{
        include: [
            {
                model: db.users,
                as: "added_by_librarian",
                attributes:{
                    exclude: [
                        'password',
                        'profilePic',
                        'section',
                        'course',
                        'year',
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: db.users,
                as: "updated_by_librarian",
                attributes:{
                    exclude: [
                        'password',
                        'profilePic',
                        'section',
                        'course',
                        'year',
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            }
        ]
    })
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

// Deleting publication country record
exports.delete_publication_country = (req, res) => {
  if (req.user == null || req.user.userType != 'Librarian'){
      res.sendStatus(403);
  }
  else{
      const id = req.params.pubCountryID;

      publication_countries.destroy({
          where:{ 
              pubCountryID: id 
          }
      })
      .then((result) => {
          console.log(result);
          // success delete
          if (result) {
              publication_countries.findByPk(id)
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

// Publication Countries Count
exports.publication_countries_count = (req, res) => {
  publication_countries
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

          // Respond rooms count
          res.send({ count: count });
      })
      .catch((err) => errResponse(res, err));
}