module.exports = (sequelize, Sequelize) => {
    return sequelize.define("drive", {
        url: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        description: {
            type: Sequelize.STRING
        }
    },
        { timestamps: false });
};