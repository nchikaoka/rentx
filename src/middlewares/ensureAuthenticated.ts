import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}
export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "e54a8ea26d044e8e6a561c746eab7d5d"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    usersRepository.findById(user_id);
    if (!user_id) {
      throw new AppError("User does not exist!", 401);
    }
    request.user = { id: user_id };
    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
