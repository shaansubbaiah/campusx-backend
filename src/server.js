const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require('./models');
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and re-sync db');
// });
db.sequelize.sync()
    .then(() => {
        console.log('Synced DB');
    })
    .catch(err => {
        console.error(err);
    });


// routes
app.get('/', (req, res) => {
    res.json({message: "Welcome to the app :)"})
});

require('./routes/thing.routes')(app);

// set port listen to requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`)
});