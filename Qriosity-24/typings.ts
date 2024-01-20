/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type QuestionsCustomizer = CollectionCustomizer<Schema, 'questions'>;
export type QuestionsRecord = TPartialRow<Schema, 'questions'>;
export type QuestionsConditionTree = TConditionTree<Schema, 'questions'>;
export type QuestionsFilter = TPaginatedFilter<Schema, 'questions'>;
export type QuestionsSortClause = TSortClause<Schema, 'questions'>;
export type QuestionsAggregation = TAggregation<Schema, 'questions'>;

export type UsersCustomizer = CollectionCustomizer<Schema, 'users'>;
export type UsersRecord = TPartialRow<Schema, 'users'>;
export type UsersConditionTree = TConditionTree<Schema, 'users'>;
export type UsersFilter = TPaginatedFilter<Schema, 'users'>;
export type UsersSortClause = TSortClause<Schema, 'users'>;
export type UsersAggregation = TAggregation<Schema, 'users'>;


export type Schema = {
  'questions': {
    plain: {
      '_id': string;
      'Answer': string;
      'Hints': string;
      'QuestionNumber': number;
      'QuestionStatement': string;
    };
    nested: {};
    flat: {};
  };
  'users': {
    plain: {
      '_id': string;
    };
    nested: {};
    flat: {};
  };
};
