const checkAuth = require('../middleware/authenticate');
const upload = require('../middleware/upload');

module.exports = app => {
    const lostfound = require('../controllers/lostfound.controller');

    let router = require('express').Router();

    // post lostfound item
    router.post('/post', checkAuth, upload.single('image'), lostfound.postLF);

    // get all lostfound items
    router.get('/all', lostfound.viewLF);

    //delete lostfound items
    router.delete('/:id', checkAuth, lostfound.deleteLF);

    app.use('/api/lostfound', router);
};