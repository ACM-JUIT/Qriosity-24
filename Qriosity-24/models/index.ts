import type { QuestionsInterface } from './questions';
import type { UsersInterface } from './users';

import Mongoose from 'mongoose';

import { questionsSchema } from './questions';
import { usersSchema } from './users';

const connection = Mongoose.createConnection(process.env.DATABASE_URL);

export const questions = connection.model<QuestionsInterface>('questions', questionsSchema, 'questions');
export const users = connection.model<UsersInterface>('users', usersSchema, 'users');

export default connection;
