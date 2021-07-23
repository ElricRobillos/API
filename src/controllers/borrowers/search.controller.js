const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;
const { Op } = require('sequelize');


// Search Materials
exports.search_materials = (req, res) => {
    const page = req.params.page;
    const limit = parseInt(process.env.FETCH_LIMIT);
    const offset = page > 1 ? (page - 1) * limit : 0; 

    var searchBy = req.body.searchBy;
    const query = req.body.query;

    // If no selected search by, the default is title
    if(searchBy == '' || searchBy == null) searchBy = 'Title';

    // Search by Title
    if(searchBy == 'Title') {
        materials
            .findAll({
                where: { 
                    status: 'Active',
                    title: { [Op.like]: `%${query}%` }
                },
                include: [
                    {
                        model: db.copies,
                        as: 'copies',
                        where: {
                            status: 'Available',
                            [Op.not]: { copyID: null }
                        }
                    }, {
                        model: db.authors,
                        as: 'authors'
                    }, {
                        model: db.users,
                        as: 'favorite_by_borrowers',
                        attributes: ['userID']
                    }, 
                ],
                limit: limit,
                offset: offset
            })
            .then(data => dataResponse(res, {
                count: data.length,
                rows: data
            }, 'Have search results', 'No search result'))
            .catch(err => errResponse(res, err))
    }

    // Search by Genre
    if(searchBy == 'Genre') {
        materials
            .findAll({
                where: { status: 'Active' },
                include: [
                    {
                        model: db.copies,
                        as: 'copies',
                        where: {
                            status: 'Available',
                            [Op.not]: { copyID: null }
                        }
                    }, {
                        model: db.authors,
                        as: 'authors'
                    }, {
                        model: db.genres,
                        as: 'genres',
                        where: {
                            genre: { [Op.like]: `%${ query }%` }
                        }
                    }, {
                        model: db.users,
                        as: 'favorite_by_borrowers',
                        attributes: ['userID']
                    }
                ],
                limit: limit,
                offset: offset
            })
            .then(data => dataResponse(res, {
                count: data.length,
                rows: data
            }, 'Have search results', 'No search result'))
            .catch(err => errResponse(res, err))
    }

    // Search by Publisher 
    if(searchBy == 'Publisher') {
        materials
            .findAll({
                where: { status: 'Active' },
                include: [
                    {
                        model: db.copies,
                        as: 'copies',
                        where: {
                            status: 'Available',
                            [Op.not]: { copyID: null }
                        }
                    }, {
                        model: db.authors,
                        as: 'authors'
                    }, {
                        model: db.publishers,
                        as: 'publisher',
                        where: {
                            publisherName: { [Op.like]: `%${ query }%` }
                        }
                    }, {
                        model: db.users,
                        as: 'favorite_by_borrowers',
                        attributes: ['userID']
                    }
                ],
                limit: limit,
                offset: offset
            })
            .then(data => dataResponse(res, {
                count: data.length,
                rows: data
            }, 'Have search results', 'No search result'))
            .catch(err => errResponse(res, err))
    }

    // Search By Country
    if(searchBy == 'Country') {
        materials
            .findAll({
                where: { status: 'Active' },
                include: [
                    {
                        model: db.copies,
                        as: 'copies',
                        where: {
                            status: 'Available',
                            [Op.not]: { copyID: null }
                        }
                    }, {
                        model: db.authors,
                        as: 'authors'
                    }, {
                        model: db.publication_countries,
                        as: 'publication_country',
                        where: {
                            country: { [Op.like]: `%${ query }%` }
                        }
                    }, {
                        model: db.users,
                        as: 'favorite_by_borrowers',
                        attributes: ['userID']
                    }
                ],
                limit: limit,
                offset: offset
            })
            .then(data => dataResponse(res, {
                count: data.length,
                rows: data
            }, 'Have search results', 'No search result'))
            .catch(err => errResponse(res, err))
    }

    // Search By Author
    if(searchBy == 'Author') {
        materials
            .findAll({
                where: { status: 'Active' },
                include: [
                    {
                        model: db.copies,
                        as: 'copies',
                        where: {
                            status: 'Available',
                            [Op.not]: { copyID: null }
                        }
                    }, {
                        model: db.authors,
                        as: 'authors',
                        where: {
                            [Op.or]: [
                                { authorFirstName:  { [Op.like]: `%${ query }%` }},
                                { authorMiddleName: { [Op.like]: `%${ query }%` }},
                                { authorLastName:   { [Op.like]: `%${ query }%` }},
                            ]
                        }
                    }, {
                        model: db.users,
                        as: 'favorite_by_borrowers',
                        attributes: ['userID']
                    }
                ],
                limit: limit,
                offset: offset
            })
            .then(data => dataResponse(res, {
                count: data.length,
                rows: data
            }, 'Have search results', 'No search result'))
            .catch(err => errResponse(res, err))
    }
}