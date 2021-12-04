import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}
export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token is missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "e54a8ea26d044e8e6a561c746eab7d5d"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    usersRepository.findById(user_id);

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
