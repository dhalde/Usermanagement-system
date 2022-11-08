const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Database connected successfully');
}).catch((e) => {
    console.log(`errror connection${e}`);
})