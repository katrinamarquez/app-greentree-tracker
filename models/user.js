const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin','customer'],
        //required: true
    },
    cart: [{
        plant: {
          type: Schema.Types.ObjectId,
          ref: 'Plants'
        },
        quantity: Number,
        addedAt: {
          type: Date,
          default: Date.now
        }
      }]
});

// plugin the passport-local-mongoose middleware with our User schema
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
