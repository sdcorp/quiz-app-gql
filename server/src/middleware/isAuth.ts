import { MiddlewareFn } from 'type-graphql'
import { IContext } from '../types/Context'

export const isAuth: MiddlewareFn<IContext> = ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error('not authenticated!')
  }
  context.userId = context.req.session!.userId
  return next()
}
