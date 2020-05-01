module.exports = (sequelize, Sequelize) => {
    return sequelize.define("book", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        publisher: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
        }
    },
        { timestamps: false });
};