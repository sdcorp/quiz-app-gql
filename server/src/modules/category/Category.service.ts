import { Service } from 'typedi'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Category } from '../../entity'
import { CategoryCreateInput, CategoryUpdateInput } from './Category.input'

@Service()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  private async checkExist(id: number) {
    const category = await this.getOneById(id)
    if (!category) throw new Error('Category not found')
    return category
  }

  async getAll(options?: FindManyOptions<Category>) {
    return this.categoryRepository.find(options)
  }

  async getOneById(id: number, options?: FindOneOptions<Category>) {
    return this.categoryRepository.findOne(id, options)
  }

  async create(input: CategoryCreateInput) {
    const category = this.categoryRepository.create(input)
    const savedCategory = await this.categoryRepository.save(category)
    return savedCategory
  }

  async update(id: number, input: CategoryUpdateInput) {
    await this.checkExist(id)
    await this.categoryRepository.update({ id }, input)
    return true
  }

  async delete(id: number) {
    await this.checkExist(id)
    await this.categoryRepository.delete(id)
    return true
  }
}
