export class Entity {
  protected readonly _id: string;
  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
