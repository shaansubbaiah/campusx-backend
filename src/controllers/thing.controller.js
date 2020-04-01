const db = require('../models');
const Thing = db.things;
const Op = db.Sequelize.Op;

// create and save a new Thing
exports.create = (req, res) => {
    if(!req.body.title || !req.body.branch || !req.body.phone || !req.body.sem) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // create Thing
    const thing = {
        title: req.body.title,
        branch: req.body.branch,
        sem: req.body.sem,
        phone: req.body.phone
    };

    // save Thing in db
    Thing.create(thing)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while creating the Thing.`
            });
        });
};

// retrieve all Things from db
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Thing.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while searching Things.`
            });
        });
};

// find a single Thing by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Thing.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error retrieving Thing with id:${id}`
            })
        })
};

// update a Thing by id in request
exports.update = (req, res) => {
    const id = req.params.id;

    Thing.update(req.body, {where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Thing id:${id} updated successfully`
                });
            } else {
                res.send({
                    message: `Cannot update Thing with id:${id}. Not found or req.body empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Thing id:${id}`
            });
        });

};

// delete a Thing by id in request
exports.delete = (req, res) => {
    const id = req.params.id;

    Thing.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Thing id:${id} deleted successfully`
                });
            } else {
                res.send({
                    message: `Cannot delete Thing id:${id}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Thing id:${id}`
            });
        });
};

// delete all Things in db
exports.deleteAll = (req, res) => {
    Thing.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Things were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Error trying to delete all Things`
            });
        });
};

// find all Things by sem