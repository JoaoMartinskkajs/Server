import { Router } from "express";
import { LoginController } from "./controllers/Auth/LoginController";
import { RegisterController } from "./controllers/Auth/RegisterController";
import { DoubleController } from "./controllers/History/DoubleController";
import Double from "./database/entities/Double";
import { authMiddleware } from "./middlewares/authMiddleware";

export const routes = Router();

routes.post('/register', new RegisterController().create);
routes.post('/login', new LoginController().login);
routes.get('/getprofile', authMiddleware, new LoginController().getProfile);

routes.get("/doublehistory", new DoubleController().index);
