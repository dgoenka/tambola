/**
 * Express router paths go here.
 */

import { Immutable } from "@src/other/types";

const Paths = {
  Base: "/api",
  Auth: {
    Base: "/auth",
    Login: "/login",
    Logout: "/logout",
  },
  Users: {
    Base: "/users",
    Get: "/all",
    Add: "/add",
    Update: "/update",
    Delete: "/delete/:id",
  },
  Game: {
    Base: "/game",
    Add: "/add",
  },
  Ticket: {
    Base: "/ticket",
    Get: "/create",
    Add: "/get",
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
