import { EntityManager, MikroORM, MongoDriver } from "@mikro-orm/mongodb";
import { IUser } from "@src/models/User";
import { Game } from "@src/models/Game";
import { TicketSet } from "@src/models/TicketSet";
import { Ticket } from "@src/models/Ticket";
import process from "process";

let orm: MikroORM;

export const getEm: () => EntityManager = () => orm?.em;

export const init = async () => {
  orm = await MikroORM.init<MongoDriver>({
    entities: [IUser, Game, TicketSet, Ticket],
    dbName: "tambola",
    clientUrl: process.env.MONGO_URL,
    type: "mongo",
  });
};
