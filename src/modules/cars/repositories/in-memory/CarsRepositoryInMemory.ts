import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository, ICreateCarsDTO } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  repository: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    brand,
    fine_amount,
    category_id,
    license_plate,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      brand,
      fine_amount,
      category_id,
      license_plate,
    });
    this.repository.push(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.find(
      (car) => car.license_plate === license_plate
    );
    return car;
  }
  async listAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.repository.filter(
      (car) =>
        car.available === true &&
        ((brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name) ||
          (!brand && !category_id && !name))
    );
    return cars;
  }
}

export { CarsRepositoryInMemory };
