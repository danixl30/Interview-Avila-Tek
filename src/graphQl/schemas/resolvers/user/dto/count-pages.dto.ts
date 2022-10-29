import { InputType, Field, Int } from 'type-graphql'
import { IsPositive } from 'class-validator'

@InputType()
export class CountPagesDTO {
    @Field(() => Int)
    @IsPositive()
    offset!: number
}
