const mongoose = require('mongoose');

const url = 'mongodb+srv://rishendra:123456789R@cluster0.ccusbff.mongodb.net/wildlifejournal?retryWrites=true&w=majority';

// asynchronous - return Promise
mongoose.connect(url)
.then((result) => {
    console.log('database connected successfully');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;