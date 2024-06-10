import bcrypt from "bcrypt";
import { LoginUserDto, UserDto } from "../types/Dto";
import { HttpError } from "../helpers";
import { TokenService } from "./token.service";
import users from "../data/users.json";

export class UserService {
  static async register(userObj: UserDto) {
    const user = users.find((user) => user.email === userObj.email);

    if (user) {
      throw new HttpError(409, "Email in use");
    }

    // const hashPassword = await bcrypt.hash(userObj.password, 10);

    return { id: userObj.id, name: userObj.name, email: userObj.email };
  }

  static async login(userObj: LoginUserDto) {
    const user = users.find((user) => user.email === userObj.email);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const isPasswordEquals = await bcrypt.compare(
      userObj.password,
      user.password
    );

    if (!isPasswordEquals) {
      throw new HttpError(401, "Email or password is wrong");
    }

    return {
      token: TokenService.generateTokens({
        id: user.id!,
        name: user.name,
        email: user.email,
      }),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  static async getUserById(id: number) {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return user;
  }

  static async logout() {
    return "User successfully logged out";
  }
}
