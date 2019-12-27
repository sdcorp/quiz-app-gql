import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql'
import { Category } from '../../entity/Category'
import { isAuth } from '../../middleware/isAuth'
import { Notification, NotificationPayload } from '../notifications/types'
import { CategoryCreateInput, CategoryUpdateInput } from './Category.input'
import { CategoryService } from './Category.service'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  private autoIncrement = 0

  @Query(() => [Category])
  async getCategories() {
    return this.categoryService.getAll({ relations: ['questions'] })
  }

  @Query(() => Category, { nullable: true })
  async getCategoryById(@Arg('id', () => Int, { nullable: true }) id: number) {
    return this.categoryService.getOneById(id, { relations: ['questions'] })
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Category)
  async createCategory(
    @Arg('input') input: CategoryCreateInput,
    @PubSub('NOTIFICATIONS') publish: Publisher<NotificationPayload>
  ) {
    const newCategory = await this.categoryService.create(input)
    await publish({ id: ++this.autoIncrement, message: 'Added new Category' })
    return newCategory
  }

  @Subscription({ topics: 'NOTIFICATIONS' })
  newNotification(@Root() { id, message }: NotificationPayload): Notification {
    return {
      id,
      message,
      date: new Date(),
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async updateCategory(@Arg('id', () => Int) id: number, @Arg('input') input: CategoryUpdateInput) {
    return this.categoryService.update(id, input)
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => Int) id: number) {
    return this.categoryService.delete(id)
  }

  @FieldResolver()
  questionCount(@Root() category: Category): number {
    return category.questions.length
  }
}
