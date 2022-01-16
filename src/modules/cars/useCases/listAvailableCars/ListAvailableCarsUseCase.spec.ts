import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars UseCase unitary tests", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Shall be possible to list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Time machine",
      description: "Flying car that travels through time",
      daily_rate: 100,
      license_plate: "XYZ-9876",
      fine_amount: 50,
      brand: "DeLorean",
      category_id: "category1",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Herbie",
      description: "Intelligent racing car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Volkswagen",
      category_id: "category2",
    });
    const carsList = await listAvailableCarsUseCase.execute({});
    expect(carsList).toEqual([car1, car2]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Time machine",
      description: "Flying car that travels through time",
      daily_rate: 100,
      license_plate: "XYZ-9876",
      fine_amount: 50,
      brand: "DeLorean",
      category_id: "category1",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Herbie",
      description: "Intelligent racing car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Volkswagen",
      category_id: "category2",
    });
    const carsList = await listAvailableCarsUseCase.execute({
      name: "Time machine",
    });
    expect(carsList).toEqual([car1]);
  });

  it("should be able to list all available cars by category", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Time machine",
      description: "Flying car that travels through time",
      daily_rate: 100,
      license_plate: "XYZ-9876",
      fine_amount: 50,
      brand: "DeLorean",
      category_id: "category1",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Herbie",
      description: "Intelligent racing car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Volkswagen",
      category_id: "category2",
    });
    const carsList = await listAvailableCarsUseCase.execute({
      category_id: "category2",
    });
    expect(carsList).toEqual([car2]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Time machine",
      description: "Flying car that travels through time",
      daily_rate: 100,
      license_plate: "XYZ-9876",
      fine_amount: 50,
      brand: "DeLorean",
      category_id: "category1",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Herbie",
      description: "Intelligent racing car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Volkswagen",
      category_id: "category2",
    });
    const carsList = await listAvailableCarsUseCase.execute({
      brand: "Volkswagen",
    });
    expect(carsList).toEqual([car2]);
  });
});
