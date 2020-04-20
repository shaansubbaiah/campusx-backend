module.exports = app => {
    const things = require('../controllers/thing.controller');

    let router = require('express').Router();

    // create a new Thing
    // router.post('/', things.create);
    router.post('/upload-book', things.createBook);
    router.post('/upload-drive', things.createDrive);
    router.post('/upload-other', things.createOther);

    // retrieve all Things
    router.get('/', things.findAll);

    // retrieve a single Thing by id
    router.get("/:id", things.findOne);

    // update Thing with id
    router.put("/:id", things.update);

    // delete Thing with id
    router.delete("/:id", things.delete);

    // create a new Thing
    router.delete("/", things.deleteAll);

    app.use('/api/things', router);
};