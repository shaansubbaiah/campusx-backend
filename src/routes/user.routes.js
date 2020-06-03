const checkAuth = require('../middleware/authenticate');

module.exports = app => {
    const users = require('../controllers/user.controller');

    let router = require('express').Router();

    // register a User
    router.post('/register', users.register);

    // login existing User - RETURNS JWT TOKEN
    router.post('/login', users.login);

    // retrieve a single User's things by id
    router.get('/:id/things', users.findUserThings);

    // retrieve a single User's lostfounds by id
    router.get('/:id/lostfounds', users.findUserLostfounds);

    // update User with id
    router.put('/:id', checkAuth, users.update);

    // delete User with id
    router.delete('/:id', checkAuth, users.delete);

    // retrieve all Users
    router.get('/', users.findAll);

    // retrieve a single User by id
    router.get('/:id', users.findOne);

    // delete all Users
    router.delete('/', users.deleteAll);

    app.use('/api/users', router);
};