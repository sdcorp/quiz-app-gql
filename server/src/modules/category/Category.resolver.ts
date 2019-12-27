import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { Category } from '../../entity/Category'
import { isAuth } from '../../middleware/isAuth'
import { CategoryCreateInput, CategoryUpdateInput } from './Category.input'
import { CategoryService } from './Category.service'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

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
  async createCategory(@Arg('input') input: CategoryCreateInput) {
    return this.categoryService.create(input)
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
