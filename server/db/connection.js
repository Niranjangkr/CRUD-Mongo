const mongoose = require('mongoose');
const mongodbConnect = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("connecting")).catch((error) => console.log(error));
}

module.exports = mongodbConnect;