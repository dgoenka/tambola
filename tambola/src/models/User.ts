// **** Variables **** //

import {
  Entity,
  Enum,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

const INVALID_CONSTRUCTOR_PARAM =
  "nameOrObj arg must a string or an " +
  "object with the appropriate user keys.";

export enum UserRoles {
  Standard,
  Admin,
}

// **** Types **** //

// @ts-ignore
@Entity()
export abstract class IUser {
  // @ts-ignore
  @PrimaryKey()
  _id!: ObjectId;

  // @ts-ignore
  @SerializedPrimaryKey()
  id!: string;

  // @ts-ignore
  @Property()
  name: string = "";

  // @ts-ignore
  @Property()
  email: string = "";

  // @ts-ignore
  @Property()
  pwdHash?: string;

  // @ts-ignore
  @Enum(() => UserRoles)
  role?: UserRoles;
}

export interface ISessionUser {
  id: number;
  email: string;
  name: string;
  role: IUser["role"];
}
