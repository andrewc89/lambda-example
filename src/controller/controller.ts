import { inject, injectable } from "inversify";
const log = require("loglevel");

import { IDENTIFIERS } from "../identifiers";
import { IManager } from "../manager";
import { LambdaEvent } from "./lambda-event";
import { LambdaResponse } from "./lambda-response";
import { BadRequestError, NotFoundError } from "../errors";

export interface IController {
  getById(event: LambdaEvent): Promise<LambdaResponse>;
}

@injectable()
export class Controller implements IController {
  constructor(
    @inject(IDENTIFIERS.MANAGER) private readonly manager: IManager,
  ) {}

  public async getById(event: LambdaEvent): Promise<LambdaResponse> {
    try {
      const id = event.getId();
      if (!id) {
        throw new BadRequestError("Need to specify id");
      }

      const dog = await this.manager.getById(id);
      return new LambdaResponse(200, dog);
    } catch (err) {
      log.error(err.stack);
      if (err.constructor === BadRequestError) {
        return new LambdaResponse(400, err.message);
      }
      else if (err.constructor === NotFoundError) {
        return new LambdaResponse(404, err.message);
      }

      return new LambdaResponse(500);
    }
  }
}
