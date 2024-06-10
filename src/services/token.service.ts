import jwt from "jsonwebtoken";

import { HttpError } from "../helpers";

export class TokenService {
  static generateTokens(payload: { id: number; name: string; email: string }) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.NODE_ENV === "production" ? "120m" : "30d",
    });

    console.log(accessToken);

    return accessToken;
  }

  static validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      return userData;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new HttpError(401, "Access expired");
      } else {
        throw new HttpError(401, "Access error");
      }
    }
  }

  static async saveToken(userId: number, refreshToken: string) {
    // return await tokenData.addToken(userId, refreshToken);
  }

  async removeToken(refreshToken: string) {
    // const tokenInfo = await tokenData.deleteTokenByRefreshTokenValue(
    //   refreshToken
    // );
    // return tokenInfo.rowCount;
  }

  async findToken(refreshToken: string) {
    // return await tokenData.findTokensByFieldValue(
    //   "refresh_token",
    //   refreshToken
    // );
  }
}
