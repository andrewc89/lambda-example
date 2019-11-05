import { APIGatewayEvent } from "aws-lambda";

export interface ILambdaEvent {
  getId(): string|undefined;
}

export class LambdaEvent implements ILambdaEvent {
  constructor(
    private readonly event: APIGatewayEvent,
  ) {}

  public getId(): string|undefined {
    return this.event.pathParameters.id || undefined;
  }
}
