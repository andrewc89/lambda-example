import { injectable } from "inversify";
const log = require("loglevel");

import { DogType } from "./type";
import { DogDbDto } from "./dto";
import { Dog } from "../dog";

const db: DogType[] = require("./dogs.db.json");

export interface IRepository {
  getDogById(id: string): Promise<Dog|undefined>;
}

@injectable()
export class Repository implements IRepository {
  public getDogById(id: string): Promise<Dog|undefined> {
    log.info(`Fetching dog with id: ${id}`);
    const dogJson = db.find(dog => dog.id === id);
    if (!dogJson) {
      return;
    }
    log.debug(`Found dog: ${JSON.stringify(dogJson)}`);
    const foundDog = new DogDbDto(dogJson);
    return Promise.resolve(foundDog.toDog());
  }
}
