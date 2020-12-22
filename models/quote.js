const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose')

const Quote = new Schema({
    plants: [{
        plant_id: {
            type: Schema.Types.ObjectId,
            required: true,
            // ref: 'Plants'
            ref: 'Plant'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        // ref: 'Users'
        ref: 'User'
    },
    comment: {
        type: String
    },
    modified_date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

// plugin the passport-local-mongoose middleware with our Quote schema
// Quote.plugin(passportLocalMongoose);

module.exports = mongoose.model('Quote', Quote);
