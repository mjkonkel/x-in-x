const { Schema } = require('mongoose');

const goalSchema = new Schema(
    {
        goalText: {
            type: String,
            required: true,
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

module.exports = goalSchema;