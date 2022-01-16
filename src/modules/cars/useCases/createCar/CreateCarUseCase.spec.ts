import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car UseCase unitary tests", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Shall be possible to register a new Car", async () => {
    const car = {
      name: "Time machine",
      description: "Flying car that travels through time",
      daily_rate: 100,
      license_plate: "XYZ-9876",
      fine_amount: 50,
      brand: "DeLorean",
      category_id: "category",
    };
    await createCarUseCase.execute(car);
    const createdCar = await carsRepositoryInMemory.findByLicensePlate(
      car.license_plate
    );
    expect(createdCar).toHaveProperty("id");
  });

  it("Shall not be possible register a car with an already used license plate", async () => {
    expect(async () => {
      const car1 = {
        name: "Time machine",
        description: "Flying car that travels through time",
        daily_rate: 100,
        license_plate: "XYZ-9876",
        fine_amount: 50,
        brand: "DeLorean",
        category_id: "category",
      };
      const car2 = {
        name: "Herbie",
        description: "Self-conscious car",
        daily_rate: 100,
        license_plate: "XYZ-9876",
        fine_amount: 50,
        brand: "Volkswagen",
        category_id: "category",
      };
      await createCarUseCase.execute(car1);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("A newly created car shall be available by default", async () => {
    const car = {
      name: "Time machine",
      description: "Flying car that travels through time",
      daily_rate: 100,
      license_plate: "XYZ-9876",
      fine_amount: 50,
      brand: "DeLorean",
      category_id: "category",
    };
    await createCarUseCase.execute(car);
    const createdCar = await carsRepositoryInMemory.findByLicensePlate(
      car.license_plate
    );
    expect(createdCar.available).toBe(true);
  });
});
