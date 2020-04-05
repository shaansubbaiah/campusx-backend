module.exports = (sequelize, Sequelize) => {
    return sequelize.define("thing", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        thingId: {
            type: Sequelize.INTEGER(4),
            primaryKey: true
        },
        ownerId: {
            type: Sequelize.INTEGER(4),
        },
        title: {
            type: Sequelize.STRING
        },
        branch: {
            type: Sequelize.STRING
        },
        sem: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.TEXT,
            validate: {
                isURL: true
            }
        }
    });
};