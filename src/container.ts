import "reflect-metadata";
import { Container } from "inversify";

import { IDENTIFIERS } from "./identifiers";
import { IController, Controller } from "./controller/controller";
import { Manager } from "./manager";
import { Repository } from "./repository/repository";

export interface ILambdaContainer {
  bind(): ILambdaContainer;
  getController(): IController;
}

export class LambdaContainer implements ILambdaContainer {
  private readonly container: Container;
  constructor() {
    this.container = new Container();
  }

  public bind(): ILambdaContainer {
    this.container.bind(IDENTIFIERS.CONTROLLER).to(Controller);
    this.container.bind(IDENTIFIERS.MANAGER).to(Manager);
    this.container.bind(IDENTIFIERS.REPOSITORY).to(Repository);
    return this;
  }

  public getController(): IController {
    return this.container.get(IDENTIFIERS.CONTROLLER);
  }
}
