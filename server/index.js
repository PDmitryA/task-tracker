'use strict';

const port = 3005;

const express = require('express');

const app = express();

const root = `${__dirname}/../public`;

app.use(express.static(root));

app.listen(port);
