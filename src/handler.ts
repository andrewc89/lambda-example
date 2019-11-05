import { APIGatewayEvent } from "aws-lambda";
import log = require("loglevel");

import { LambdaContainer } from "./container";
import { LambdaEvent } from "./controller";

import { config } from "./config";
log.setLevel(config.LOG_LEVEL);

export async function handler(
  event: APIGatewayEvent,
) {
  try {
    log.debug(`Event: ${JSON.stringify(event)}`);
    const container = new LambdaContainer().bind();
    const controller = container.getController();
    const response = await controller.getById(new LambdaEvent(event));
    console.log(`Response: ${JSON.stringify(response)}`);
    return response;
  } catch (err) {
    log.error(err.stack);
    throw err;
  }
}
