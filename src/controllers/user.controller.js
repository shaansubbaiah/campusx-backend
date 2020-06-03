const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const apiConfig = require('../config/api.config');

const db = require('../models');
const User = db.users;
const Thing = db.things;
const Book = db.books;
const Drive = db.drives;
const Other = db.others;
const LostFound = db.lostfound;

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
        res.send({
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
                res.send({
                    message: `User not found, register to continue.`
                })
                return;
            }

            // else check password
            bcrypt.compare(req.body.password, data.dataValues.password, (err, result) => {
                if (err) {
                    res.status(401).send({
                        message: `Not Authorized`
                    })
                    return;
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
                        token: token,
                        email: data.dataValues.email,
                        id: data.dataValues.id,
                        name: data.dataValues.name
                    })
                }
                res.send({
                    message: `Wrong Password`
                })
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error`
            })
        })

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
            res.send({
                email: data.dataValues.email,
                id: data.dataValues.id,
                name: data.dataValues.name
            });
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
        where: { userId: id },
        include: [Book, Other, Drive]
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

// find all lost founds from user but id
exports.findUserLostfounds = (req, res) => {
    const id = req.params.id;

    LostFound.findAll({ where: { userId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while getting User's LostnFound items.`
            });
        });
}

// update a User by id in request
exports.update = async (req, res) => {
    // update data of user whose token is provided
    const reqUserId = req.userData.id;

    // check for pass(required) and name, email, newpass (atleast one)
    if ((!req.body.name && !req.body.email && !req.body.newpass) && !req.body.pass) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }
    else {
        let newUserInfo = {};

        if (req.body.name)
            newUserInfo.name = req.body.name;
        if (req.body.email)
            newUserInfo.email = req.body.email;
        if (req.body.newpass) {
            bcrypt.hash(req.body.newpass, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || `Error occurred hashing password.`
                    })
                }
                else {
                    newUserInfo.password = hash;
                }
            })
        }

        console.log(newUserInfo);

        // check if new email is already used
        if (req.body.email) {
            let emailExists = await User.findOne({ where: { email: req.body.email } })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    })
                })

            if (emailExists != null) {
                res.send({
                    message: `Mail already used, try another email`
                })
                return;
            }
        }

        // get data from db of user with email = email in token
        let data = await User.findOne({ where: { email: req.userData.email } })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Could not find user`
                })
            })

        // if user with email procided doesnt exist 
        if (data == null) {
            res.status(500).send({
                message: `User not found, register to continue`
            })
            return;
        }

        // check if password provided matches password in token
        let allValid = await bcrypt.compare(req.body.pass, data.dataValues.password);

        if (!allValid) {
            res.send({
                message: `Wrong old password`
            })
        }
        else {
            // password matches, update info
            await User.update(newUserInfo, { where: { id: reqUserId } })
                .catch(err => {
                    res.status(500).send({
                        message: `Error updating User id:${reqUserId}`
                    });
                });

            res.send({
                message: `User updated successfully`
            });
        }
    }
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
