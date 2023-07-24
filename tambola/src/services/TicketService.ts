import { RandomPopableSet } from "@src/models/RandomPopableSet";
import {
  TAMBOLA_ALL_NUMBERS_OCCUR_IN_NUM_TICKETS,
  Ticket,
} from "@src/models/Ticket";

const get = (uid: string, ticketId: string, from: number, count: number) => {};
const create = (uid: string, gameId: string, ticketCount: number) => {
  const psuedoTicketCount =
    ticketCount +
    (TAMBOLA_ALL_NUMBERS_OCCUR_IN_NUM_TICKETS -
      (ticketCount % TAMBOLA_ALL_NUMBERS_OCCUR_IN_NUM_TICKETS));

  const psuedoSet = [];
  const columnSet = new RandomPopableSet(9);
  const rowSet = new RandomPopableSet(psuedoTicketCount * 3);
  const columnsPoppedInOrder = [];

  for (
    let i = 0;
    i < psuedoTicketCount;
    i += TAMBOLA_ALL_NUMBERS_OCCUR_IN_NUM_TICKETS
  ) {
    const subSet = new Array(TAMBOLA_ALL_NUMBERS_OCCUR_IN_NUM_TICKETS).map(
      () => new Ticket()
    );
    psuedoSet.push(subSet);
  }

  return psuedoSet.slice(0, ticketCount);
};
export default {
  get,
  create,
} as const;
