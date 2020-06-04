module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lostfound", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        location: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^(\+91( )?)?[0-9]{10}$/g,
            }
        },
        image: {
            type: Sequelize.STRING,
        }
    });
};