import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Question } from './Question'

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field(() => [Question], { nullable: true })
  @OneToMany(
    () => Question,
    (question) => question.category
  )
  questions: Question[]

  @Field(() => Int)
  questionCount: number
}
