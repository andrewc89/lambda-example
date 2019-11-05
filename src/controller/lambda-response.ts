export class LambdaResponse {
  constructor(
    public readonly statusCode: number,
    public readonly body?: object|string,
  ) {}
}
