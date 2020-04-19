module.exports = (sequelize, Sequelize) => {
    return sequelize.define("book", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        author: {
            type: Sequelize.STRING
        },
        publisher: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.TEXT,
            validate: {
                isURL: true
            }
        }
    },
        { timestamps: false });
};