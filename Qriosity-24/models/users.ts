import Mongoose from 'mongoose';

interface UsersInterface {
}

const usersSchema = new Mongoose.Schema({
}, {
  timestamps: false,
});

export { UsersInterface, usersSchema };
