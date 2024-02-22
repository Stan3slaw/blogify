export interface UserWithPasswordResponseDto {
  id: number;
  email: string;
  fullname: string;
  password: string;
}

export type UserResponseDto = Omit<UserWithPasswordResponseDto, 'password'>;

export interface CurrentUserResponseDto {
  id: number;
  fullname: string;
}
