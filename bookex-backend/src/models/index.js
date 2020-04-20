const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

// create db from config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

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

//db.users = require('./user.model')(sequelize, Sequelize);
db.things = require('./thing.model')(sequelize, Sequelize);
db.books = require('./book.model')(sequelize, Sequelize);
db.others = require('./other.model')(sequelize, Sequelize);
db.drives = require('./drive.model')(sequelize, Sequelize);

// define relations ;)
// db.users.hasMany(db.things);
// db.things.belongsTo(db.users);

db.things.hasOne(db.books);
db.books.belongsTo(db.things);

db.things.hasOne(db.drives);
db.drives.belongsTo(db.things);

db.things.hasOne(db.others);
db.others.belongsTo(db.things);

module.exports = db;