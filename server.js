const port = 3030;

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
