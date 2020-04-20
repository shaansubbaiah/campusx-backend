module.exports = (sequelize, Sequelize) => {
    return sequelize.define("drive", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        url: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    },
        { timestamps: false });
};