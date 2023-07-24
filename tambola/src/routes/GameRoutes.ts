import { IReq, IRes } from "@src/routes/types/express/misc";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import GameService from "@src/services/GameService";

/**
 * Create a new game
 */
async function create(req: IReq, res: IRes) {
  const user = res.locals.sessionUser;
  const setId = await GameService.create(String(user?.id));
  return res.status(HttpStatusCodes.OK).json({ setId });
}

export default {
  create,
} as const;
