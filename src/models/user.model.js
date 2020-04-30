module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        name: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        gtoken: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        phone: {
            type: Sequelize.BIGINT(10),
            // allowNull: false,
            validate: {
                is: /^(\+91( )?)?[0-9]{10}$/g,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
};