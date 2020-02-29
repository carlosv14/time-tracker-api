var express = require('express');
var cors = require('cors');

app = express();
app.use(cors());
port = process.env.PORT || 3000;
jwt = require('jsonwebtoken'),
mongoose = require('mongoose'),
User = require('./api/models/userModel'),
Team = require('./api/models/teamModel'),
Project = require('./api/models/projectModel'),
Activity = require('./api/models/activityModel'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TimeTrackerDb', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRoutes = require('./api/routes/userRoutes');
var teamRoutes = require('./api/routes/teamRoutes');
var projectRoutes = require('./api/routes/projectRoutes');
var activityRoutes = require('./api/routes/activityRoutes');


userRoutes(app);
teamRoutes(app);
projectRoutes(app);
activityRoutes(app);

app.listen(port);

console.log('Time Tracker API server started on: ' + port);