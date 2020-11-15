let express = require('express');
// Setup server port
var port = process.env.PORT || 5000;
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let cors = require('cors');

let apiRoutes = require("./api-routes");
require('dotenv/config');

// Configure bodyparser to handle post requests
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
// if no mongodb atlas, connect to local mongodb
// mongoose.connect('mongodb://localhost:27017/PostDB',
mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost:27017/PostDB',
    { useNewUrlParser: true,
    useUnifiedTopology: true}
    );

console.log(process.env.DB_CONNECTION)
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app;