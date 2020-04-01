module.exports = (sequelize, Sequelize) => {
    return sequelize.define("thing", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        title: {
            type: Sequelize.STRING
        },
        branch: {
            type: Sequelize.STRING
        },
        sem: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.NUMBER(10)
        }
    });
};