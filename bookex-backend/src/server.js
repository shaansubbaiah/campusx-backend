const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const db = require('./models');

var myArgs = process.argv.slice(2);
if (myArgs[0] == 'c') {

    db.sequelize.sync({ force: true }).then(() => {
        console.log('\nDrop and re-sync db');
    });
}
else {
    db.sequelize.sync()
        .then(() => {
            console.log('\nSynced DB');
        })
        .catch(err => {
            console.error(err);
        });
}


// routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the app :)" })
});

require('./routes/thing.routes')(app);
require('./routes/user.routes')(app);

// 404 on unhandled route
app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        message: error.message
    });
})

// set port listen to requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/ \n`)
});