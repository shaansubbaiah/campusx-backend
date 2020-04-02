module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        userId: {
            type: Sequelize.INTEGER(4),
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            }
        },
        phone: {
            type: Sequelize.BIGINT(10)
        }
    });
};