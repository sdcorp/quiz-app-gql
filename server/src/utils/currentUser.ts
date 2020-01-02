import { createParamDecorator } from 'type-graphql'
import { IContext } from '../types/Context'

export function CurrentUser() {
  return createParamDecorator<IContext>(({ context }) => context.req.session!.userId)
}
