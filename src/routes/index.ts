import { Router } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import * as core from "express-serve-static-core";

import Middlewares from "../middlewares";
const { isAuthenticated } = Middlewares.Authenticators;

class ApplicationRoutes {
  routes: core.Router;

  constructor() {
    this.routes = Router();
    this.authRoutes();
    this.userRoutes();
  }

  private authRoutes() {
    this.routes.post("/login", AuthController.login);
  }

  private userRoutes() {
    this.routes.get("/users", isAuthenticated, UserController.getAllUsers);
    this.routes.get("/user/:id", isAuthenticated, UserController.getUser);
    this.routes.post("/user", UserController.createUser);
    this.routes.delete("/user/:id", isAuthenticated, UserController.deleteUser);
  }
}

export default new ApplicationRoutes().routes;
