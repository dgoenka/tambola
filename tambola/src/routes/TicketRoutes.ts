import { IReq, IRes } from "@src/routes/types/express/misc";
import TicketService from "@src/services/TicketService";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

/**
 * Get all tickets in a set.
 */
async function get(req: IReq, res: IRes) {
  const user = res.locals.sessionUser;
  const { setId, from, count } = req.params as any;
  const tickets = await TicketService.get(String(user?.id), setId, from, count);
  return res.status(HttpStatusCodes.OK).json({ tickets });
}

async function create(req: IReq, res: IRes) {
  const user = res.locals.sessionUser;
  const { gameId, quantity } = req.body as any;
  const setId = await TicketService.create(String(user?.id), gameId, quantity);
  return res.status(HttpStatusCodes.OK).json({ setId });
}

export default {
  get,
  create,
} as const;
