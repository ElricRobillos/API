const { errResponse, dataResponse, emptyDataResponse } = require("../../helpers/controller.helper")
const db = require("../../models");
const users= db.users;
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

// Add User
exports.add_user = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        req.body.added_by = req.user.userID
        req.body.updated_by = req.user.userID
        req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUND));
        
        const idNumber = req.body.idNumber;
        const email = req.body.email;

        console.log(idNumber)

        // Find if both Student/Staff Number and Email existed.
        users
            .findOne({
                where: {
                    [Op.or]: {
                        idNumber: idNumber,
                        email: email
                    }
                }
            })
            .then(result => {
                if(result) {
                    if(result.idNumber === idNumber && result.email === email) {
                        errResponse(res, 'User already exists');
                    } else if(result.idNumber === idNumber) {
                        errResponse(res, 'ID Number is already used');
                    } else if(result.email === email) {
                        errResponse(res, 'Email is already used');
                    }
                } else {
                    users
                        .create(req.body)
                        .then((data) => dataResponse(res, data, 'Account has been successfully registered', 'Failed to add an account'))
                        .catch((err) => errResponse(res, err));
                }
            })
            .catch((err) => errResponse(res, err));
    }
};

// Retrieve all users
exports.view_all_users = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        users
            .findAll()
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Find user
exports.find_user = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        users
            .findByPk(req.params.userID)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Update a User by the id in the request
exports.update_user = async (req, res) => {
    const id = req.params.userID

    if (req.body.password) {
        req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS)
        );
    }

    users.update(req.body, {
        where: { userID: id },
    })
        .then((result) => {
        if (result) {
            // success
            users.findByPk(id).then((data) => {
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
            message: [process.env.SUCCESS_UPDATE],
            });
        }
        })
        .catch((err) => errResponse(res, err));
};


// Retrieve all students
exports.view_all_students = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        users
            .findAll({ 
                atrributes: {
                    exclude: [
                        'password'
                    ]
                },
                where: { 
                    userType: 'Student'
                }
            })
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Find Student
exports.find_student = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        const id = req.params.userID;

        users
            .findByPk(id,{
                atrributes: {
                    exclude: ['password']
                }
            })
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};


// Retrieve all staffs
exports.view_all_staffs = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        users
            .findAll({ 
                attributes: {
                    exclude: [
                        'course',
                        'year',
                        'section',
                        'password'
                    ]
                },
                where: { 
                    userType: 'Staff'
                }
            })
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Find Staff
exports.find_staff = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        const id = req.params.userID;

        users
            .findByPk(id,{
                attributes: {
                    exclude: [
                        'course',
                        'year',
                        'section',
                        'password'
                    ]
                }                
            })
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Users Count
exports.users_count = (req, res) => {
    users
        .count({
            col: 'userType',
            group: ['userType']
        })
        .then((result) => {
            count = {
                total: 0,
                students: 0,
                staffs: 0,
                librarian: 0
            }

            result.forEach(r => {
                
                // Get total count
                count.total += r.count

                // Get all active count
                if(r.userType === 'Student')   count.students  += r.count
                if(r.userType === 'Staff')     count.staffs    += r.count
                if(r.userType === 'Librarian') count.librarian += r.count

            });

            // Respond rooms count
            res.send({ count: count });
        })
        .catch((err) => errResponse(res, err));
}


exports.view_all_borrowers = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        users
            .findAll({ 
                where: { 
                    status: 'Active',
                    [Op.or]: [
                        { userType: 'Student' },
                        { userType: 'Staff' },
                    ]
                }})
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch(err => errResponse(res, err));
    }
}

// Find borrower
exports.find_borrower = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        users
            .findAll({ 
                where: { 
                    idNumber: req.body.idNumber, 
                    status: 'Active'
                }
            })
            .then((data) => {
                if(data.length) {
                    users
                        .findOne({
                            attributes: {
                                exclude: [
                                    'password',
                                ]
                            },
                            where: { idNumber: req.body.idNumber }
                        })
                        .then(data => dataResponse(res, data, 'A borrower was found','No borrower was found'))
                        .catch(err => errResponse(res, err));
                } else {
                    emptyDataResponse(res, 'No borrower was found')
                }
            })
            .catch((err) => errResponse(res, err));
    }
};
