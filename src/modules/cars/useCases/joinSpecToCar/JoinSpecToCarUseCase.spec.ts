import { JoinSpecToCarUseCase } from "./JoinSpecToCarUseCase";

let joinSpecToCarUseCase: JoinSpecToCarUseCase;

describe("Join specifications to cars usecase unitary tests", () => {
  beforeEach(() => {
    joinSpecToCarUseCase = new JoinSpecToCarUseCase();
  });

  it("It shall be possible to associate a specification to a car", () => {
    joinSpecToCarUseCase.execute();
  });
});
