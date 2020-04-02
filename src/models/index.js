const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

// create db from config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.things = require('./thing.model.js')(sequelize, Sequelize);
db.users = require('./user.model.js')(sequelize, Sequelize);

db.users.hasMany(db.things, {
    foreignKey: 'userId'
});
db.things.belongsTo(db.users);

module.exports = db;
