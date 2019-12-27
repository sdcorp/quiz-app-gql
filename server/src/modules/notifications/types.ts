import { Field, ID, ObjectType } from 'type-graphql'

// TODO Read more about Subscriptions
// https://github.com/MichalLytek/type-graphql/tree/v0.17.5/examples/simple-subscriptions

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: number

  @Field({ nullable: true })
  message?: string

  @Field(() => Date)
  date: Date
}

export interface NotificationPayload {
  id: number
  message?: string
}
