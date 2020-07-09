const mongoose = require('mongoose');
const config = require('config');
const dB = config.get('mongoURI');

const connectDb = async () => {
    try {
        await mongoose.connect(dB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongodB connected');
    } catch(error) {
        console.error(error);
        //Exit process
        process.exit(1);
    }
} 

module.exports = connectDb;
