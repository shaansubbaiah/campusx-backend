module.exports = app => {
    const users = require('../controllers/user.controller');

    let router = require('express').Router();

    // create a new User
    router.post('/', users.create);

    // retrieve all Users
    router.get('/', users.findAll);

    // retrieve a single User by id
    router.get("/:id", users.findOne);

    // retrieve a single User's things by id
    router.get("/:id/things", users.findUserThings);

    // update User with id
    router.put("/:id", users.update);

    // delete User with id
    router.delete("/:id", users.delete);

    // delete all Users
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};