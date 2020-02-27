export class TipUtilizator {
  id_nivel_acces: number;
  rol: string;

  public constructor(init?: Partial<TipUtilizator>) {
    Object.assign(this, init);
  }
}
