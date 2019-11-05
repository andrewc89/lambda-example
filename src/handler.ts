import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import log = require("loglevel");

import { LambdaContainer } from "./container";
import { LambdaEvent } from "./controller/lambda-event";

export async function handler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) {
  try {
    const container = new LambdaContainer().bind();
    const controller = container.getController();
    await controller.getById(
      new LambdaEvent(event),
      callback,
    );
  } catch (err) {
    log.error(err.stack);
    callback(err);
  }
}
