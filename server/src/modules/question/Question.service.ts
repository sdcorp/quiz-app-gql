import { Service } from 'typedi'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Category, Question } from '../../entity'
import { QCreateInput, QUpdateInput } from './Question.input'

@Service()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  private async checkExist(id: number) {
    const q = await this.getOneById(id)
    if (!q) throw new Error('Question not found')
    return q
  }

  async getAll(options?: FindManyOptions<Question>) {
    return this.questionRepository.find(options)
  }

  async getOneById(id: number, options?: FindOneOptions<Question>) {
    return this.questionRepository.findOne(id, options)
  }

  async create(categoryId: number, input: QCreateInput) {
    const category = await this.categoryRepository.findOne(categoryId)

    if (!category) throw new Error('Category not found')

    const q = this.questionRepository.create({ ...input, category })

    const newQ = await this.questionRepository.save(q)

    return newQ
  }

  async update(id: number, input: QUpdateInput, categoryId?: number) {
    if (!categoryId) {
      await this.questionRepository.update({ id }, input)
      return true
    }

    const catPromise = this.categoryRepository.findOne(categoryId)
    const qPromise = this.questionRepository.findOne(id)
    const [q, c] = await Promise.all([qPromise, catPromise])

    if (!q) throw new Error('Question not found')
    if (!c) throw new Error('Category not found')

    q.category = c
    q.title = input.title ? input.title : q.title

    const upd = await this.questionRepository.save(q)
    return !!upd
  }

  async delete(id: number) {
    await this.checkExist(id)
    await this.questionRepository.delete(id)
    return true
  }
}
