import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PsydbDataSource} from '../datasources';
import {Question, QuestionRelations} from '../models';

export class QuestionRepository extends DefaultCrudRepository<
  Question,
  typeof Question.prototype.id,
  QuestionRelations
> {
  constructor(
    @inject('datasources.psydb') dataSource: PsydbDataSource,
  ) {
    super(Question, dataSource);
  }
}
