import {
  Entity,
  OneToMany,
  PrimaryKey,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { Game } from "@src/models/Game";
import { IUser } from "@src/models/User";
import { ObjectId } from "@mikro-orm/mongodb";

// @ts-ignore
@Entity()
export class TicketSet {
  // @ts-ignore
  @PrimaryKey()
  _id!: ObjectId;

  // @ts-ignore
  @SerializedPrimaryKey()
  id!: string;

  // @ts-ignore
  @OneToMany(() => IUser, (user) => user.id)
  userId: string = "";

  // @ts-ignore
  @OneToMany(() => Game, (game) => game.id)
  gameId: string = "";
}
