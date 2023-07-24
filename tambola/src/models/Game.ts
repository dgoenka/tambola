import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { IUser } from "@src/models/User";

// @ts-ignore

@Entity()
export class Game {
  // @ts-ignore
  @PrimaryKey()
  _id: string = "";

  // @ts-ignore
  @Property()
  startedAt: Date = new Date();

  // @ts-ignore
  @OneToMany(() => IUser, (user) => user.id)
  creatorId: string = "";
}
