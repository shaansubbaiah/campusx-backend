module.exports = (sequelize, Sequelize) => {
    return sequelize.define("thing", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branch: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sem: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};