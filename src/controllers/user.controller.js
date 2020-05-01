const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/authenticate');
const apiConfig = require('../config/api.config');

const db = require('../models');
const User = db.users;
const Thing = db.things;
const Op = db.Sequelize.Op;

// user register
exports.register = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // check if email already in db
    let isNewEmail = await User.findOne({ where: { email: req.body.email } })
        .then(data => {
            if (data !== null)
                return false;
            else
                return true;
        })

    // encrypt password with bcrypt
    if (isNewEmail) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || `Error occurred hashing password.`
                })
            }
            else {
                const user = {
                    email: req.body.email,
                    name: req.body.name,
                    password: hash
                }

                User.create(user)
                    .then(data => {
                        // create object without password and send
                        const userCreated = {
                            id: data.dataValues.id,
                            email: data.dataValues.email,
                            name: data.dataValues.name
                        }
                        res.send(userCreated);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || `Error occurred while creating the User.`
                        });
                    });
            }
        })
    }
    else {
        res.status(500).send({
            message: `Email has already registered.`
        });
    }
};


// user login
exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    User.findOne({
        where: { email: req.body.email }
    })
        .then(data => {
            // if user with email doesnt exist 
            if (data == null) {
                res.status(401).send({
                    message: `Not Authorized`
                })
            }

            // else check password
            bcrypt.compare(req.body.password, data.dataValues.password, (err, result) => {
                if (err) {
                    res.status(401).send({
                        message: `Not Authorized`
                    })
                }
                // password matches, create JWT token
                if (result) {
                    const token = jwt.sign(
                        {
                            email: data.dataValues.email,
                            id: data.dataValues.id
                        },
                        apiConfig.JWT_SECRET,
                        {
                            expiresIn: "24h"
                        }
                    );

                    return res.status(200).send({
                        message: `Authorization successful.`,
                        token: token
                    })
                }
                res.status(401).send({
                    message: `Not Authorized`
                })
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error`
            })
        })

};


// // create and save a new User
// exports.create = (req, res) => {
//     if (!req.body.gtoken || !req.body.name || !req.body.email || !req.body.phone) {
//         res.status(400).send({
//             message: 'Content can\'t be empty!'
//         });
//         return;
//     }

//     // create User
//     const user = {
//         name: req.body.name,
//         gtoken: req.body.gtoken,
//         email: req.body.email,
//         phone: req.body.phone
//     };

//     // save User in db
//     User.create(user)
//         .then(data => {
//             res.status(201).send({
//                 message: `User registered successfully.`
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || `Error registering the User.`
//             });
//         });
// };

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

    console.log(req.userData);

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

    // 

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
