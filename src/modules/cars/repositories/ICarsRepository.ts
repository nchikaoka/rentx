import { Car } from "../infra/typeorm/entities/Car";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarsDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  listAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository, ICreateCarsDTO };
