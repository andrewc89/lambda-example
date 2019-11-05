import { inject, injectable } from "inversify";

import { IDENTIFIERS } from "./identifiers";
import { IRepository } from "./repository/repository";
import { Dog } from "./dog";
import { NotFoundError } from "./errors/not-found";

export interface IManager {
  getById(id: string): Promise<Dog>;
}

@injectable()
export class Manager implements IManager {
  constructor(
    @inject(IDENTIFIERS.REPOSITORY) private readonly repository: IRepository,
  ) {}

  public async getById(id: string): Promise<Dog> {
    const dog = await this.repository.getDogById(id);
    if (!dog) {
      throw new NotFoundError("Dog not found");
    }
    return dog;
  }
}
