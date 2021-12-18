import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User UseCase unitary tests", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123xyz",
      email: "john.doe@test.com",
      password: "password",
      name: "John Doe",
    };

    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not authenticate an inexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong@email.com",
        password: "wrong",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not authenticate if password is wrong", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "abc789",
        email: "joao.silva@teste.com",
        password: "senha",
        name: "Joao Silva",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
