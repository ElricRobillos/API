const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;
const { Op } = require('sequelize');


// Search Materials
exports.search_materials = (req, res) => {
    const searchBy = req.body.searchBy;
    const query = req.body.query;

    console.log(searchBy);
    console.log(query);
    
    // if(searchBy == 'Title') {
    //     materials
    //         .findAll({
    //             where: { 
    //                 status: 'Active',
    //                 [Op.like]: `%${query}%`
    //             },
    //             include: [
    //                 {
    //                     model: db.copies,
    //                     as: 'copies',
    //                     where: {
    //                         status: 'Available',
    //                         [Op.not]: { copyID: null }
    //                     }
    //                 }, {
    //                     model: db.authors,
    //                     as: 'authors'
    //                 }
    //             ],
    //         })
    //         .then(data => dataResponse(res, data, 'Have search results', 'No search result'))
    //         .catch(err => errResponse(res, err))
    // }
}