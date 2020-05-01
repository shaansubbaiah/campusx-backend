module.exports = (sequelize, Sequelize) => {
    return sequelize.define("other", {
        // Sequelize also defines by default the fields id (primary key),
        // createdAt and updatedAt to every model.
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.BIGINT(10),
            allowNull: false,
            validate: {
                is: /^(\+91( )?)?[0-9]{10}$/g,
            }
        }
    },
        { timestamps: false });
};