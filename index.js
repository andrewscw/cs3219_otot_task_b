let express = require('express');
// Setup server port
var port = process.env.PORT || 5000;
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://root:root@cluster0.oetju.mongodb.net/database0?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true}
    );
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