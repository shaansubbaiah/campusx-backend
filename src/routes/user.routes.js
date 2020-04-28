const checkAuth = require('../middleware/authenticate');

module.exports = app => {
    const users = require('../controllers/user.controller');

    let router = require('express').Router();

    // register a User
    router.post('/register', users.register);

    // login existing User
    router.post('/login', users.login);

    // create a new User
    router.post('/', users.create);

    // retrieve all Users
    router.get('/', users.findAll);

    // retrieve a single User by id
    router.get("/:id", checkAuth, users.findOne);

    // retrieve a single User's things by id
    router.get("/:id/things", checkAuth, users.findUserThings);

    // update User with id
    router.put("/:id", users.update);

    // delete User with id
    router.delete("/:id", users.delete);

    // delete all Users
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};