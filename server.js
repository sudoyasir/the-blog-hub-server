const port = 3030;

const express = require('express');
const mongoose = require('mongoose')

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

mongoose.connect('mongodb+srv://yasir2002:EliteBook2002@cluster0.vgcb7fd.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("MongoDB Atlas is connected to server!");
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    })
}).catch((error) => {
    console.log("db NOT connected");
    console.log(error.message);
})
