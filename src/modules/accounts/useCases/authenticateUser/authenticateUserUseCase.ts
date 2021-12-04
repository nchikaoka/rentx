import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";
import { isConstructorToken } from "tsyringe/dist/typings/providers/injection-token";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw Error("incorrect email or password!");
    }

    const passwordMatch = compare(password, user.password);
    if (!passwordMatch) {
      throw Error("incorrect email or password!");
    }

    const token = sign({}, "e54a8ea26d044e8e6a561c746eab7d5d", {
      subject: user.id,
      expiresIn: "1d",
    });

    const authInfo: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return authInfo;
  }
}

export { AuthenticateUserUseCase };
