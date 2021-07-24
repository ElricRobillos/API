const { errResponse, dataResponse, emptyDataResponse } = require("../../helpers/controller.helper")
const db = require("../../models");
const users= db.users;
const bcrypt = require("bcrypt");

// Get Borrower Information
exports.get_borrower_info = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser) {
        res.sendStatus(403);
    } else {
        users
            .findByPk(req.user.userID)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};


// Update Password
exports.update_password = (req, res) =>  {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser) {
        res.sendStatus(403);
    } else {

        // Get password from req.body
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10) ;

        // Find user and check password
        users
            .findByPk(req.user.userID, { attributes: ['userID', 'password'] })
            .then(result => {
                if(result) {
                    bcrypt.compare(req.body.currentPassword, result.password, (err, hasResult) => {

                        // Display error if exists
                        if(err) console.log(err);
                        
                        // If no result then send empty reponse
                        if(!hasResult) return emptyDataResponse(res, 'Invalid details or password');
                        
                        // Else update user password
                        users
                            .update({ password: newPassword }, { where: { userID: req.user.userID }})
                            .then(data => dataResponse(res, data, 'Password has been changed successfully', 'Password has been changed successfully'))
                            .catch(err => errResponse(res, err));
                    });
                }
            })
            .catch(err => errResponse(res, err));
    }
}


// Update Information
exports.update_info = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser) {
        res.sendStatus(403);
    } else {
        users
            .update(req.body, {
                where: {
                    userID: req.user.userID
                }
            })
            .then(data => dataResponse(res, data, 'User Information is successfully updated', 'No user information has been updated'))
            .catch(err => errResponse(res, err));
    }
}