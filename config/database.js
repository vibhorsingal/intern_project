const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb://localhost:27017/bands', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connection successfull')
    })
    .catch((err) => {
        console.log('connection to database failed')
    })