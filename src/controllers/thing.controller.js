const db = require('../models');
const Thing = db.things;
const Book = db.books;
const Drive = db.drives;
const Other = db.others;
const Op = db.Sequelize.Op;

// create and save a new Thing
createThing = async (req, res) => {
    if (!req.body.title || !req.body.branch || !req.body.sem) {
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
        userId: req.body.userId
    };

    let id;
    // save Thing in db
    await Thing.create(thing)
        .then(data => {
            id = data.id;
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while creating the Thing.`
            });
        });

    return id;
};

// create and  save a new Book
exports.createBook = async (req, res) => {
    let thingId = await createThing(req, res);

    if (!req.body.author || !req.body.publisher || !req.body.image) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // create Book
    const book = {
        author: req.body.author,
        publisher: req.body.publisher,
        image: req.body.image,
        thingId: thingId
    };

    // save Book in db
    Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while creating Book.`
            });
        });
}

// create and  save a new Drive
exports.createDrive = async (req, res) => {
    let thingId = await createThing(req, res);

    if (!req.body.url || !req.body.description) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // create Drive
    const drive = {
        url: req.body.url,
        description: req.body.description,
        thingId: thingId
    };

    // save Drive in db
    Drive.create(drive)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while creating Drive.`
            });
        });
}

// create and  save a new Other
exports.createOther = async (req, res) => {
    let thingId = await createThing(req, res);

    if (!req.body.description || !req.body.image) {
        res.status(400).send({
            message: 'Content can\'t be empty!'
        });
        return;
    }

    // create Other
    const other = {
        image: req.body.image,
        description: req.body.description,
        thingId: thingId
    };

    // save Other in db
    Other.create(other)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while creating Other.`
            });
        });
}

// retrieve all Things from db
exports.findAll = (req, res) => {
    const title = req.query.title;
    const sem = req.query.sem;
    const branch = req.query.branch;
    const type = req.query.type;

    let matchTitle = title ? { title: { [Op.like]: `%${title}%` } } : null;
    let matchSem = sem ? { sem: { [Op.like]: `%${sem}%` } } : null;
    let matchBranch = branch ? { branch: { [Op.like]: `%${branch}%` } } : null;

    let model;
    if (type == 'book')
        model = Book;
    else if (type == 'other')
        model = Other;
    else if (type == 'drive')
        model = Drive;
    else
        model = Thing; // fix this :/

    model.findAll({
        where: {
            [Op.and]: [matchTitle, matchSem, matchBranch]
        },
        include: Thing
        // include: [{
        //     model: model,
        //     // where: { thingId: Sequelize.col('id') }
        // }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while searching Things.`
            });
        });
};

// TODO: fix searching, deleting, etc for each type(for book, other, drive, etc)

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

    Thing.update(req.body, { where: { id: id } })
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

    Thing.destroy({ where: { id: id } })
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
