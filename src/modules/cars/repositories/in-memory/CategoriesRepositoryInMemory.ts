import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  repository: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.find(
      (category) => category.name === name
    );
    return category;
  }
  async list(): Promise<Category[]> {
    const all = await this.repository;
    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });
    this.repository.push(category);
  }
}

export { CategoriesRepositoryInMemory };
