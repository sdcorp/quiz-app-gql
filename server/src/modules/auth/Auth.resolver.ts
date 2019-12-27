import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { User } from '../../entity'
import { isAuth } from '../../middleware/isAuth'
import { IContext } from '../../types/Context'
import { UserInput } from './Auth.input'
import { AuthService } from './Auth.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly authService: AuthService) {}

  @UseMiddleware(isAuth)
  @Query(() => User)
  async me(@Ctx() ctx: IContext): Promise<User | undefined> {
    return await this.authService.getOne(ctx.userId)
  }

  @Mutation(() => Boolean)
  async register(@Arg('userinput') { email, password }: UserInput): Promise<Boolean> {
    return await this.authService.create(email, password)
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: IContext
  ): Promise<User | null> {
    return await this.authService.authenticate(email, password, ctx)
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: IContext): Promise<Boolean> {
    return await this.authService.logout(ctx)
  }
}
