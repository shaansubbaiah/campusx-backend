module.exports = (sequelize, Sequelize) => {
    return sequelize.define("thing", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.BIGINT(10),
            allowNull: false,
            validate: {
                is: /^(\+91( )?)?[0-9]{10}$/g,
            }
        },
        branch: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sem: {
            type: Sequelize.STRING,
            allowNull: false
        },
        donation: {
            type: Sequelize.BOOLEAN,
        }
    });
};