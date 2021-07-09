const {errResponse, dataResponse} = require("../../helpers/controller.helper");
const db = require("../../models");
const publication_countries = db.publication_countries;

// Publication Countries Options
dbPubCountriesOp = { 
  attributes:{
    exclude:[
        'materialID'
    ]
  },
  where:{ 
      status: "Active" 
  },
  include:[
    {
      model: db.materials,
      as: 'material',
      attributes:{
        exclude: [
          'addedBy',
          'updatedBy',
          'addedAt',
          'updatedAt',
          'shelfID',
          'languageID',
          'typeID',
          'publisherID',
          'pubCountryID'
        ]
      },
      include:[
        {
          model: db.author_material,
          as: 'author_materials',
          attributes:{
            exclude:[
              'materialID',
              'authorID'
            ]
          },
          include: [
            {
              model: db.authors,
              as: 'authors',
            }
          ]
        },
        {
          model: db.genre_material,
          as: 'genre_materials',
          attributes:{
            exclude:[
              'materialID',
              'genreID'
            ]
          },
          include: [
            {
              model: db.genres,
              as: 'genres',
            }
          ]
        },
        {
          model: db.shelves,
          as: 'shelf',
          attributes:{
            exclude: [
              'addedBy',
              'updatedBy',
              'addedAt',
              'updatedAt',
              'roomID'
            ]
          },
          include: [
            {
              model: db.rooms,
              as: 'room',
              attributes:{
                exclude: [
                  'status',
                  'addedBy',
                  'updatedBy',
                  'addedAt',
                  'updatedAt',
                  'roomID'
                ]
              },
              include: [
                {
                  model: db.buildings,
                  as: 'building',
                  attributes:{
                    exclude: [
                      'status',
                      'addedBy',
                      'updatedBy',
                      'addedAt',
                      'updatedAt',
                      'roomID'
                    ]
                  },
                }
              ]
            }
          ],
        },
        {
          model: db.languages,
          as: 'language',
          attributes:{
            exclude: [
                'addedBy',
                'updatedBy',
                'addedAt',
                'updatedAt'
            ]
          }
        },
        {
          model: db.material_types,
          as: 'material_type',
          attributes:{
            exclude: [
              'addedBy',
              'updatedBy',
              'addedAt',
              'updatedAt'
            ]
          }
        },
        {
          model: db.publishers,
          as: 'publisher',
          attributes:{
            exclude: [
              'addedBy',
              'updatedBy',
              'addedAt',
              'updatedAt'
            ]
          }
        },
      ]
    }
  ],
  order: [['country', 'asc']]
}

// Retrieve all publication_countries
exports.view_all_publication_countries = (req, res) => {
  const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
  if(res.user == null && !authorizedUser){
      res.sendStatus(403);
  } else {
    publication_countries
      .findAll(dbPubCountriesOp)
      .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
      .catch((err)  => errResponse(res, err));
  }
};

// Find specific publication_country
exports.find_publication_country = (req, res) => {
  const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    } else {
      publication_countries
        .findByPk(req.params.pubCountryID, dbPubCountriesOp)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};