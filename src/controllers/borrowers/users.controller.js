const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const users= db.users;
const bcrypt = require("bcrypt");

// View user account
exports.view_user_account  = (req, res) => {
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        users.findByPk(req.user.userID)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Update user account
exports.update_user = async (req, res) => {
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        const id = req.params.userID

        if (req.body.password) {
            req.body.password = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT_ROUNDS)
            );
        }

        users.update(req.body, {
            where:{ 
                userID: id 
            },
        })
        .then((result) => {
        if (result) {
            // success update
            users.findByPk(id)
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
            message: [process.env.SUCCESS_UPDATE],
            });
        }
        })
        .catch((err) => errResponse(res, err));
    }
};

