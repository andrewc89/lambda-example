import { DogType } from "./type";
import { Dog } from "../dog";

export class DogDbDto {
  constructor(
    private readonly dogJson: DogType,
  ) {}

  public toDog(): Dog {
    return new Dog(
      this.dogJson.id,
      this.dogJson.name,
      this.dogJson.age,
    );
  }
}
