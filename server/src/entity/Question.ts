import { Field, ID, ObjectType } from 'type-graphql'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Category } from './Category'

@ObjectType()
@Entity({ name: 'questions' })
export class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @CreateDateColumn()
  createdAt: string

  @Field()
  @UpdateDateColumn()
  updatedAt: string

  @Field(() => Category, { nullable: true })
  @ManyToOne(
    () => Category,
    (category) => category.questions,
    { onDelete: 'CASCADE' }
  )
  category: Category
}
