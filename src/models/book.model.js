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
        phone: {
            type: Sequelize.BIGINT(10),
            allowNull: false,
            validate: {
                is: /^(\+91( )?)?[0-9]{10}$/g,
            }
        },
        image: {
            type: Sequelize.STRING,
        }
    },
        { timestamps: false });
};