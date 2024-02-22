import { compare } from 'bcryptjs';

import { JWT_SECRET } from '../common/constants';
import type { CurrentUserResponseDto } from '../user/dto/user-response.dto';
import { HttpException } from '../common/exceptions/http.exception';
import { HttpStatus } from '../common/exceptions/http-status.enum';
import userService from '../user/user.service';
import type { AuthorizationPayloadResponseDto } from './dto/authorization-response.dto';
import type { RegisterUserDto } from './dto/register-user.dto';
import type { LoginUserDto } from './dto/login-user.dto';

class AuthorizationService {
  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<AuthorizationPayloadResponseDto> {
    const existedUser = await userService.findOne(registerUserDto.email);

    if (existedUser) {
      throw new HttpException(
        'User with specified email already exists',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const { id, email } = await userService.create(registerUserDto);
      const payload = { email, id };

      return payload;
    }
  }

  login = async (
    loginUserDto: LoginUserDto,
  ): Promise<AuthorizationPayloadResponseDto> => {
    const { id, email, password } = await userService.findOne(
      loginUserDto.email,
    );
    const isValidPass = await compare(loginUserDto.password, password);

    if (!email || !isValidPass) {
      throw new HttpException(
        'user email, or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { email, id };

    return payload;
  };

  getCurrentUser = async (userId: number): Promise<CurrentUserResponseDto> => {
    const user = await userService.findOneById(userId);

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { id, fullname } = user;

    return { id, fullname };
  };
}

export default new AuthorizationService();
