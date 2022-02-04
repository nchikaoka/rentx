import { Request, Response } from "express";
import { container } from "tsyringe";

import { JoinSpecToCarUseCase } from "./JoinSpecToCarUseCase";

class JoinSpecToCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const joinSpecToCarUseCase = container.resolve(JoinSpecToCarUseCase);

    const car = await joinSpecToCarUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(car);
  }
}

export { JoinSpecToCarController };
