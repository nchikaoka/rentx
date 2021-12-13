import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  repository: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });
    this.repository.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.repository.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.repository.find((user) => user.id === id);
  }
}
export { UsersRepositoryInMemory };