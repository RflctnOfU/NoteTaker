// require express
const express = require('express');
// require your routes - for the api
const apiRoutes = require('./routes/apiRoutes');
// require you routes - for the html
const htmlRoutes = require('./routes/htmlRoutes');

// initialize the app
const app = express();
// create a port - reference server.js files from activities in this module
const PORT = 3001;
// set up body parsing, static, and route middleware - activities 15 and 16
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes); // activities 21 and 22

// start the server on the port - app.listen - reference server.js files from activites in this module
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);