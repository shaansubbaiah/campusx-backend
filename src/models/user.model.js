module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            }
        },
        // password: {
        //     type: Sequelize.STRING
        // },
        phone: {
            type: Sequelize.BIGINT(10)
        }
    });
};