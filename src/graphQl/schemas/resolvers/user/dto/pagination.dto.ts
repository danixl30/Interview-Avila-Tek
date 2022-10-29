import { InputType, Field, Int } from 'type-graphql'
import { IsPositive } from 'class-validator'

@InputType()
export class PaginationDTO {
    @Field(() => Int)
    @IsPositive()
    page!: number
    @Field(() => Int)
    @IsPositive()
    offset!: number
}
