const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

// create and save a new User
exports.create = (req, res) => {
    if(!req.body.userId || !req.body.name || !req.body.email || !req.body.phone) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // create User
    const user = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };

    // save User in db
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while creating the User.`
            });
        });
};

// retrieve all Users from db
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while searching Users.`
            });
        });
};

// find a single User by id
exports.findOne = (req, res) => {
    const userId = req.params.userId;

    User.findByPk(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error retrieving User with userId:${userId}`
            })
        })
};

// update a User by userId in request
exports.update = (req, res) => {
    const userId = req.params.userId;

    User.update(req.body, {where: {userId: userId}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `User userId:${userId} updated successfully`
                });
            } else {
                res.send({
                    message: `Cannot update User with userId:${userId}. Not found or req.body empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating User userId:${userId}`
            });
        });

};

// delete a User by id in request
exports.delete = (req, res) => {
    const userId = req.params.userId;

    User.destroy({where: { userId: userId }})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `User userId:${userId} deleted successfully`
                });
            } else {
                res.send({
                    message: `Cannot delete User userId:${userId}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User userId:${userId}`
            });
        });
};

// delete all Users in db
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Error trying to delete all Users`
            });
        });
};
