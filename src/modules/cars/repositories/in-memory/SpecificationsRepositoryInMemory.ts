import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  repository: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.repository.push(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.find(
      (specification) => specification.name === name
    );
    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.filter((specification) =>
      ids.includes(specification.id)
    );
    return specifications;
  }
}
export { SpecificationsRepositoryInMemory };
