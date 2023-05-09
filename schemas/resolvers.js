const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user_id })
                    .select('-__v -password')
                .populate('goals')

                return userData;
            }

            throw new AuthenticationError('Not logged in')
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
            .populate('goals')
        },
        user: async (parent, { username }) => {
            console.log('the username is ', username)
            const userData = await User.findOne({ username })
                .select('-__v -password')
            .populate('goals')
            console.log(userData)
            return userData
        },
        goals: async (parent, { username }) => {
            return Goal.find()
        },
        goal: async (parent, { _id }) => {
            return Goal.findOne({ _id });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials1');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials2')
            }

            const token = signToken(user);
            return { user, token };
        },
        addGoal: async (parent, args, context) => {
            if (context.user) {
                const goal = await Goal.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user_id },
                    { $push: { goals: goal._id } },
                    { new: true }
                );

                return goal;
            }

            throw new AuthenticationError('You need to be logged in')
        }
    }
};

module.exports = resolvers;