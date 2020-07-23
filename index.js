const express = require("express");
const app = express();
const cors = require('cors')
const bodyparser = require('body-parser')
const connection = require('./conf');
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())

app.post('/members', (req, res) => {
    const formData = req.body;
    connection.query(`INSERT INTO members SET ?`, formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la pré-inscription");
          } else {
            res.sendStatus(200);
          }
    })
})

app.get('/members', (req, res) => {
    connection.query(`SELECT * FROM members`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la pré-inscription');
        } else {
            res.json(results);
        }
    })
})


app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }

    console.log(`Server is listening on ${port}`);
});