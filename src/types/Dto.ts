export type UserDto = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type PostDto = {
  id?: number;
  title: string;
  text: string;
};
