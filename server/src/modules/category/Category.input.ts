import { Field, InputType } from 'type-graphql'
import { Category } from '../../entity/Category'

@InputType()
export class CategoryUpdateInput implements Partial<Category> {
  @Field({ nullable: true })
  name?: string
}

@InputType()
export class CategoryCreateInput implements Partial<Category> {
  @Field()
  name: string
}
