module.exports = (sequelize, Sequelize) => {
    return sequelize.define("book", {
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        publisher: {
            type: Sequelize.STRING,
            allowNull: false,
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
    },
        { timestamps: false });
};