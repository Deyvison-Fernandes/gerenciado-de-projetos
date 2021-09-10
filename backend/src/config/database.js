const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/gerenciador-projeto');

mongoose.Promise = global.Promise;
module.exports = mongoose;