import { APIGatewayEvent } from "aws-lambda";
import log = require("loglevel");

import { LambdaContainer } from "./container";
import { LambdaEvent } from "./controller/lambda-event";

export async function handler(
  event: APIGatewayEvent,
) {
  try {
    const container = new LambdaContainer().bind();
    const controller = container.getController();
    return controller.getById(new LambdaEvent(event));
  } catch (err) {
    log.error(err.stack);
    throw err;
  }
}
