import Mongoose from 'mongoose';

interface QuestionsInterface {
  Answer: string;
  Hints: string;
  QuestionNumber: number;
  QuestionStatement: string;
}

const questionsSchema = new Mongoose.Schema({
  Answer: String,
  Hints: String,
  QuestionNumber: Number,
  QuestionStatement: String,
}, {
  timestamps: false,
});

export { QuestionsInterface, questionsSchema };
