import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository, ICreateCarsDTO } from "../ICarsRepository";

class CarsCategoryInMemory implements ICarsRepository {
  repository: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    brand,
    fine_amount,
    category_id,
    license_plate,
  }: ICreateCarsDTO): Promise<void> {
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
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.find(
      (car) => car.license_plate === license_plate
    );
    return car;
  }
}

export { CarsCategoryInMemory };
