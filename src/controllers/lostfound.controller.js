const db = require('../models');
const LostFound = db.lostfound;

exports.postLF = async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.location || !req.body.phone) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // create lostfound
    const lostfound = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        image: req.file.path,
        phone: req.body.phone,
        userId: req.body.userId
    };

    // save lostfound in db
    LostFound.create(lostfound)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while creating lostfound.`
            });
        });
};

exports.viewLF = (req, res) => {
    LostFound.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while getting LostnFound items.`
            });
        });
};

exports.deleteLF = (req, res) => {
    const id = req.params.id;

    // check if only uploader of the lostfound is attempting to delete it
    const reqUserId = req.userData.id;
    LostFound.findByPk(id)
        .then(data => {
            if (data.dataValues.userId != reqUserId) {
                res.status(401).send({
                    message: `Not Authorized`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error retrieving LostFound with id:${id}`
            })
        })

    LostFound.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `LostFound id:${id} deleted successfully`
                });
            } else {
                res.send({
                    message: `Cannot delete LostFound id:${id}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete LostFound id:${id}`
            });
        });
};
