// const express = require('express'); // CJS CommonJS syntax
import express from 'express';  // ESM Ecmascript Module syntax

const app = express();

// Routing
app.get('/', (req, res) => {
    res.send('Welcome to SocialTree DevTree!');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Server is running on port:', port);
});