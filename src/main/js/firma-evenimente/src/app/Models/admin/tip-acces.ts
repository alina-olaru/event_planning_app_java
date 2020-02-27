export class TipAcces {

  id_acces: number;
  modalitate_acces: string;

  public constructor(init?: Partial<TipAcces>) {
    Object.assign(this, init);
  }
}
