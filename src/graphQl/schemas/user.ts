import { ObjectType, Field } from 'type-graphql'
import { IsString, IsEmail, IsMongoId } from 'class-validator'

@ObjectType()
export class User {
    @IsString()
    @Field()
    username!: string
    @Field()
    @IsEmail()
    email!: string
    @Field()
    @IsMongoId()
    id!: string
}
