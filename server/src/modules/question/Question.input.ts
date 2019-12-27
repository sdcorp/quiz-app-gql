import { Field, InputType } from 'type-graphql'
import { Question } from '../../entity'

@InputType()
export class QUpdateInput implements Partial<Question> {
  @Field({ nullable: true })
  title?: string
}

@InputType()
export class QCreateInput implements Partial<Question> {
  @Field()
  title: string
}
