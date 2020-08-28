// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up Express app and port
const app = express();
const PORT = process.env.PORT || 4000;

// Sets up express app to handle data parsing (applies middleware)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes


