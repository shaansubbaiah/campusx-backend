module.exports = (sequelize, Sequelize) => {
    return sequelize.define("other", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        description: {
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