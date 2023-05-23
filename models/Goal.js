const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {
        goalText: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Goal = model('Goal', goalSchema);

module.exports = Goal;