import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

import {
  MAX_EMAIL_CHARACTERS,
  MAX_FULLNAME_CHARACTERS,
  MAX_PASSWORD_CHARACTERS,
} from '../../user/user.constants';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'email is required' })
  @MaxLength(MAX_EMAIL_CHARACTERS, {
    message: 'email max length is 60 characters',
  })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'fullname is required' })
  @IsString({ message: 'fullname should be a string' })
  @MaxLength(MAX_FULLNAME_CHARACTERS, {
    message: 'fullname max length is 60 characters',
  })
  readonly fullname: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password should be a string' })
  @MaxLength(MAX_PASSWORD_CHARACTERS, {
    message: 'password max length is 60 characters',
  })
  readonly password: string;
}
