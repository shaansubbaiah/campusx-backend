const checkAuth = require('../middleware/authenticate');

module.exports = app => {
    const things = require('../controllers/thing.controller');

    let router = require('express').Router();

    // create new things - REQ AUTH
    router.post('/upload-book', checkAuth, things.createBook);
    router.post('/upload-drive', checkAuth, things.createDrive);
    router.post('/upload-other', checkAuth, things.createOther);

    // retrieve all Things
    router.get('/', things.findAll);

    // retrieve a single Thing by id
    router.get("/:id", things.findOne);

    // update Thing with id - REQ AUTH
    router.put("/:id", checkAuth, things.update);

    // delete Thing with id - REQ AUTH
    router.delete("/:id", checkAuth, things.delete);

    // delete every Thing
    router.delete("/", things.deleteAll);

    app.use('/api/things', router);
};