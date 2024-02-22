import { hash } from 'bcryptjs';

import type { RegisterUserDto } from '../authorization/dto/register-user.dto';
import type {
  UserResponseDto,
  UserWithPasswordResponseDto,
} from './dto/user-response.dto';
import userRepository from './user.repository';

class UserService {
  async findOne(
    email: string,
  ): Promise<UserWithPasswordResponseDto | undefined> {
    return userRepository.findOneWithPassword(email);
  }

  findOneById = async (
    userId: number,
  ): Promise<UserResponseDto | undefined> => {
    return userRepository.findOneById(userId);
  };

  create = async (createUserDto: RegisterUserDto): Promise<UserResponseDto> => {
    const hashedPassword = await hash(createUserDto.password, 10);

    return userRepository.create(createUserDto, hashedPassword);
  };
}

export default new UserService();
