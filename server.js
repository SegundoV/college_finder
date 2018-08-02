const path = require('path')
const express = require('express')
const app = express()

app.use('/', express.static(path.join(__dirname + '/dist')));
app.listen(process.env.PORT || 5000, () => console.log('App listening on port 5000'));
