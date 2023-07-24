export class RandomPopableSet {
  private arraySet: (string | number)[] = [];
  private poppedElements: (string | number)[] = [];
  repetitionRound = 0;
  constructor(sizeOrElements: number | string[] | number[]) {
    if (Array.isArray(sizeOrElements)) {
      this.arraySet.push(...sizeOrElements);
    } else {
      this.arraySet.push(
        ...new Array(sizeOrElements).map((ignore, index) => index)
      );
    }
  }

  next() {
    if (this.arraySet.length < 1) {
      this.arraySet.push(...this.poppedElements);
      this.poppedElements.length = 0;
      this.repetitionRound++;
    }
    const index = Math.floor(Math.random() * this.arraySet.length);
    const value = this.arraySet.splice(index, 1)[1];
    this.poppedElements.push(value);
    return { index, value, repetitionRound: this.repetitionRound };
  }
}
