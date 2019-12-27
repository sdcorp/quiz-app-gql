import { Arg, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Question } from '../../entity/Question'
import { isAuth } from '../../middleware/isAuth'
import { QCreateInput, QUpdateInput } from './Question.input'
import { QuestionService } from './Question.service'

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question])
  async getQuestions() {
    return this.questionService.getAll({ relations: ['category'] })
  }

  @Query(() => Question, { nullable: true })
  async getQuestionById(@Arg('id', () => Int, { nullable: true }) id: number) {
    return this.questionService.getOneById(id, { relations: ['category'] })
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Question)
  async createQuestion(
    @Arg('categoryId', () => Int, { defaultValue: 1 }) categoryId: number,
    @Arg('input') input: QCreateInput
  ) {
    return this.questionService.create(categoryId, input)
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async updateQuestion(
    @Arg('id', () => Int) id: number,
    @Arg('input') input: QUpdateInput,
    @Arg('catId', () => Int, { nullable: true }) catId?: number
  ) {
    return this.questionService.update(id, input, catId)
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteQuestion(@Arg('id', () => Int) id: number) {
    return this.questionService.delete(id)
  }
}
