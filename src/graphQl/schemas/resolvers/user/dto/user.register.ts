import { InputType, Field } from 'type-graphql'
import { IsString, Matches, IsEmail } from 'class-validator'

@InputType()
export class UserRegisterDTO {
    @Field()
    @IsString()
    username!: string
    @Field()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password not strong',
    })
    password!: string
    @Field()
    @IsEmail()
    email!: string
}
