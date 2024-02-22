import type { Knex } from 'knex';

import knexService from '../common/db/knex.service';
import type {
  UserResponseDto,
  UserWithPasswordResponseDto,
} from './dto/user-response.dto';
import type { CreateUser } from './interfaces/create-user.interface';

class UserRepository {
  async findOneWithPassword(
    email: string,
    trx?: Knex.Transaction<unknown, unknown[]>,
  ): Promise<UserWithPasswordResponseDto> {
    const knex: Knex = trx ?? knexService;
    const user = await knex('users')
      .first({
        id: 'id',
        email: 'email',
        fullname: 'fullname',
        password: 'password',
      })
      .where({ email });

    return user;
  }

  async findOneById(
    id: number,
    trx?: Knex.Transaction<unknown, unknown[]>,
  ): Promise<UserResponseDto> {
    const knex: Knex = trx ?? knexService;
    const user = await knex('users')
      .first({ id: 'id', email: 'email', fullname: 'fullname' })
      .where({ id });

    return user;
  }

  async create(
    createUser: CreateUser,
    hashedPassword: string,
    trx?: Knex.Transaction<unknown, unknown[]>,
  ): Promise<UserResponseDto> {
    const knex: Knex = trx ?? knexService;
    const [createdUser] = await knex('users')
      .insert({
        email: createUser.email,
        fullname: createUser.fullname,
        password: hashedPassword,
      })
      .returning(['id', 'email', 'fullname']);

    return createdUser;
  }
}

export default new UserRepository();
