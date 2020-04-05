module.exports = app => {
    const users = require('../controllers/user.controller');

    let userRouter = require('express').Router();

    // create a new User
    userRouter.post('/', users.create);

    // retrieve all Users
    userRouter.get('/', users.findAll);

    // retrieve a single User by id
    userRouter.get("/:userId", users.findOne);

    // retrieve a single User's things by id
    userRouter.get("/:userId/things", users.findUserThings);

    // update User with id
    userRouter.put("/:userId", users.update);

    // delete User with id
    userRouter.delete("/:userId", users.delete);

    // create a new User
    userRouter.delete("/", users.deleteAll);

    app.use('/api/users', userRouter);
};