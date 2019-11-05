import { inject, injectable } from "inversify";
import { Callback } from "aws-lambda";

import { IDENTIFIERS } from "../identifiers";
import { IManager } from "../manager";
import { LambdaEvent } from "./lambda-event";
import { LambdaResponse } from "./lambda-response";

export interface IController {
  getById(event: LambdaEvent, callback: Callback): Promise<void>;
}

@injectable()
export class Controller implements IController {
  constructor(
    @inject(IDENTIFIERS.MANAGER) private readonly manager: IManager,
  ) {}

  public async getById(event: LambdaEvent, callback: Callback): Promise<void> {
    const id = event.getId();
    if (!id) {
      callback(
        null,
        new LambdaResponse(400, { message: "Need to specify id" }),
      );
    }

    const dog = await this.manager.getById(id);
    if (!dog) {
      callback(
        null,
        new LambdaResponse(404, { message: "No dog found" }),
      );
    }

    callback(
      null,
      new LambdaResponse(200, dog),
    );
  }
}
