const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const languages = db.languages;

// Retrieve all languages
exports.view_all_languages = (req, res) => {
  languages.findAll({
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
            'pubCountryID',
            'authorID',
            'genreID'
          ]
        },
        include : [
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
            }
          },
          {
            model: db.authors,
            as: 'authors',
            attributes:{
              exclude: [
                'addedBy',
                'updatedBy',
                'addedAt',
                'updatedAt',
                'materialID'
              ]
            }
          },
          {
            model: db.genres,
            as: 'genres',
            attributes:{
              exclude: [
                'addedBy',
                'updatedBy',
                'addedAt',
                'updatedAt',
                'materialID'
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
          {
            model: db.publication_countries,
            as: 'publication_country',
            attributes:{
              exclude: [
                'addedBy',
                'updatedBy',
                'addedAt',
                'updatedAt'
              ]
            }
          }
        ]
      }
    ]
  })
  .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
  .catch((err)  => errResponse(res, err));
};

// Find specific language
exports.find_language = (req, res) => {
  const id = req.params.languageID;

  languages.findByPk(id,{
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
            'pubCountryID',
            'authorID',
            'genreID'
          ]
        },
        include : [
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
            }
          },
          {
            model: db.authors,
            as: 'authors',
            attributes:{
              exclude: [
                'addedBy',
                'updatedBy',
                'addedAt',
                'updatedAt',
                'materialID'
              ]
            }
          },
          {
            model: db.genres,
            as: 'genres',
            attributes:{
              exclude: [
                'addedBy',
                'updatedBy',
                'addedAt',
                'updatedAt',
                'materialID'
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
          {
            model: db.publication_countries,
            as: 'publication_country',
            attributes:{
              exclude: [
                'addedBy',
                'updatedBy',
                'addedAt',
                'updatedAt'
              ]
            }
          }
        ]
      }
    ]
  })
  .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
  .catch((err)  => errResponse(res, err));
};
