import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { JoinSpecToCarUseCase } from "./JoinSpecToCarUseCase";

let joinSpecToCarUseCase: JoinSpecToCarUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Join specifications to cars use case unitary tests", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    joinSpecToCarUseCase = new JoinSpecToCarUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("It shall not be possible to associate a specification to a not registered car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["5678"];
      await joinSpecToCarUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("It shall be possible to associate a specification to a existing car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Time machine",
      description: "Flying car that travels through time",
      daily_rate: 100,
      license_plate: "XYZ-9876",
      fine_amount: 50,
      brand: "DeLorean",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Spec1",
      description: "Spec1 description",
    });

    const specifications_id = [specification.id, "54321"];
    const specifications_car = await joinSpecToCarUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specifications_car.specifications).toEqual([specification]);
  });

  // it("It shall not be possible to associate a specification to a car that has been already associated to the same specification", async () => {
  //   await joinSpecToCarUseCase.execute({ car_id, specifications_id });
  // });

  // it("Only an admin user shall be able to associate a specification to a car", async () => {
  //   await joinSpecToCarUseCase.execute({ car_id, specifications_id });
  // });

  // it("It shall not be possible to associate a non existent specification", async () => {
  //   await joinSpecToCarUseCase.execute({ car_id, specifications_id });
  // });
});
