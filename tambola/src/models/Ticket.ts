import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { TicketSet } from "@src/models/TicketSet";

export const TAMBOLA_TICKET_NUM_COLUMNS = 9;
export const TAMBOLA_TICKET_NUM_ROWS = 3;
export const TAMBOLA_TICKET_CELL_BLANK = "_";
export const TAMBOLA_TICKET_CELL_DISABLED = "0";
export const TAMBOLA_TICKET_PER_ROW = 5;
export const TAMBOLA_TICKET_MIN_PER_COLUMN = 1;
export const TAMBOLA_ALL_NUMBERS_OCCUR_IN_NUM_TICKETS = 6;

export class TicketCell {
  x: number;
  y: number;
  value: string;
  constructor(x: number, y: number, value: string) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
}

// @ts-ignore
@Entity()
export class Ticket {
  // @ts-ignore
  @PrimaryKey()
  _id!: ObjectId;

  // @ts-ignore
  @OneToMany(TicketSet, (ticketSet) => ticketSet._id)
  setId: string = "";

  // @ts-ignore
  @Property
  ticketData: TicketCell[][] = [];
  constructor() {
    this.ticketData = new Array(TAMBOLA_TICKET_NUM_ROWS).map(
      (ignored, yIndex) =>
        new Array(TAMBOLA_TICKET_NUM_COLUMNS).map(
          (ignored, xIndex) =>
            new TicketCell(xIndex, yIndex, TAMBOLA_TICKET_CELL_DISABLED)
        )
    );
  }

  enable(x: number, y: number) {
    if (!this.canRowBeEnabledFurther(x)) return;
    this.ticketData[y][x].value = TAMBOLA_TICKET_CELL_BLANK;
    return this.isRowShouldNotBeEnabledFurther(x);
  }

  getRow(y: number) {
    return this.ticketData[y];
  }

  getColumn(x: number) {
    return this.ticketData.map((row) => row[x]);
  }

  fill(aNumber: number) {
    const x = aNumber === 90 ? 8 : aNumber % 10;
    const column: TicketCell[] = this.getColumn(x);
    const columnNumbers: number[] = column
      .filter((ticketCell) =>
        [TAMBOLA_TICKET_CELL_DISABLED, TAMBOLA_TICKET_CELL_BLANK].includes(
          ticketCell.value
        )
      )
      .map((ticketCell) => Number(ticketCell.value));
    columnNumbers.push(aNumber);
    columnNumbers.sort();
    if (columnNumbers.length > 1) {
      column.forEach((ticketCell) => {
        if (ticketCell.value !== TAMBOLA_TICKET_CELL_DISABLED) {
          ticketCell.value = TAMBOLA_TICKET_CELL_BLANK;
        }
      });
    }
    columnNumbers.forEach((aNumber) => {
      const cell = column.find(
        (cellInArr) => cellInArr.value === TAMBOLA_TICKET_CELL_BLANK
      );
      if (cell) cell.value = String(aNumber);
    });
  }

  canRowBeEnabledFurther(y: number) {
    const rowCurrentUtilisation = this.getRowCurrentUtilisation(y);
    return rowCurrentUtilisation < TAMBOLA_TICKET_PER_ROW;
  }

  isRowShouldNotBeEnabledFurther(y: number) {
    const rowCurrentUtilisation = this.getRowCurrentUtilisation(y);
    return rowCurrentUtilisation === TAMBOLA_TICKET_PER_ROW;
  }

  getRowCurrentUtilisation(y: number) {
    const row = this.getRow(y);
    return row.filter(
      (ticketCell) =>
        ticketCell.value === TAMBOLA_TICKET_CELL_BLANK ||
        ticketCell.value !== TAMBOLA_TICKET_CELL_DISABLED
    ).length;
  }

  isColumnSatisfied(x: number) {
    const column = this.getColumn(x);
    return (
      column.filter(
        (ticketCell) =>
          ticketCell.value === TAMBOLA_TICKET_CELL_BLANK ||
          ticketCell.value !== TAMBOLA_TICKET_CELL_DISABLED
      ).length > TAMBOLA_TICKET_MIN_PER_COLUMN
    );
  }
}
