import { inject, injectable } from "inversify";

import { IDENTIFIERS } from "./identifiers";
import { IRepository } from "./repository";

export interface IManager {
  getById(id: string): Promise<object|undefined>;
}

@injectable()
export class Manager implements IManager {
  constructor(
    @inject(IDENTIFIERS.REPOSITORY) private readonly repository: IRepository,
  ) {}

  public async getById(id: string): Promise<object|undefined> {

  }
}
