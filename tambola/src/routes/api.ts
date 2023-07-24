import { Router } from "express";
import jetValidator from "jet-validator";

import adminMw from "./middleware/adminMw";
import Paths from "./constants/Paths";
import User from "@src/models/User";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import TicketRoutes from "./TicketRoutes";
import GameRoutes from "./GameRoutes";

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// **** Setup AuthRouter **** //

const authRouter = Router();

// Login user
authRouter.post(
  Paths.Auth.Login,
  validate("email", "password"),
  AuthRoutes.login
);

// Logout user
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(["user", User.isUser]),
  UserRoutes.add
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(["user", User.isUser]),
  UserRoutes.update
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(["id", "number", "params"]),
  UserRoutes.delete
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, userRouter);

// ** Add TicketRouter ** //

const ticketRouter = Router();

// Get a ticket set, paginated
ticketRouter.get(Paths.Ticket.Get, TicketRoutes.get);

// Add a ticket set
ticketRouter.post(Paths.Ticket.Add, TicketRoutes.create);

// Add TicketRouter
apiRouter.use(Paths.Ticket.Base, adminMw, ticketRouter);

// **** Export default **** //

// ** Add GameRouter ** //

const gameRouter = Router();

// Get a ticket set, paginated
gameRouter.get(Paths.Game.Add, GameRoutes.create);

// Add TicketRouter
apiRouter.use(Paths.Game.Base, adminMw, gameRouter);

// **** Export default **** //

export default apiRouter;
