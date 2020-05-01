module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
};