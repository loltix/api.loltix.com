"use strict";
// Node Modules
const express = require("express");
const bodyParser = require("body-parser");

// App Modules
const routes = require("./Routes");
const mockRoutes = require("./Mocks");

// Set up app
const app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
app.use("/v1", routes);
app.use("/mock", mockRoutes);

app.listen(8000, () => console.log(`Swagger That API listening on port 8000!`));