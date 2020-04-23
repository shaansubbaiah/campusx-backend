const db = require('../models');
const User = db.users;
const Thing = db.things;
const Op = db.Sequelize.Op;

// create and save a new User
exports.create = (req, res) => {
    if (!req.body.gtoken || !req.body.name || !req.body.email || !req.body.phone) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // create User
    const user = {
        name: req.body.name,
        gtoken: req.body.gtoken,
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
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error retrieving User with id:${id}`
            })
        })
};

// find all things of a User by id
exports.findUserThings = (req, res) => {
    const id = req.params.id;

    Thing.findAll({
        where: { userId: id }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while searching User's things.`
            });
        });
}

// update a User by id in request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `User id:${id} updated successfully`
                });
            } else {
                res.send({
                    message: `Cannot update User with id:${id}. Not found or req.body empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating User id:${id}`
            });
        });

};

// delete a User by id in request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `User id:${id} deleted successfully`
                });
            } else {
                res.send({
                    message: `Cannot delete User id:${id}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User id:${id}`
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
