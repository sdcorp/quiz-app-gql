import bcrypt from 'bcryptjs'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '../../entity'
import { IContext } from '../../types/Context'

@Service()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getOne(id?: number) {
    return this.userRepository.findOne(id)
  }

  async create(email: string, password: string) {
    const hashedpassword = await bcrypt.hash(password, 12)
    const user = this.userRepository.create({
      email,
      password: hashedpassword,
    })
    const saved = await this.userRepository.save(user)
    return !!saved
  }

  async authenticate(email: string, password: string, ctx: IContext) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      return null
    }
    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return null
    }

    ctx.req.session!.userId = user.id
    // better solution
    // https://github.com/MichalLytek/type-graphql/blob/v0.17.5/examples/middlewares-custom-decorators/decorators/current-user.ts
    ctx.userId = user.id
    return user
  }

  async logout(ctx: IContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) return rej(false)
        ctx.res.clearCookie('qid')
        ctx.userId = undefined
        return res(true)
      })
    )
  }
}
