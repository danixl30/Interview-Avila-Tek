import { InputType, Field } from 'type-graphql'
import { Matches, IsEmail } from 'class-validator'

@InputType()
export class UserLoginDTO {
    @Field()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password not strong',
    })
    password!: string
    @Field()
    @IsEmail()
    email!: string
}
