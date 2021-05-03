const mongoose = require('mongoose')
const mongoPath = 'MONGO_PATH'

//KY30qFq7DwXbUxN2

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}