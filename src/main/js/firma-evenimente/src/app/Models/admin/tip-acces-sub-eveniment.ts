export class TipAccesSubEveniment {
  id_sub_eveniment: number;
  id_acces: number;
  nume_categorie_sub_eveniment: string;
  modalitate_acces: string;

  public constructor(init?: Partial<TipAccesSubEveniment>) {
    Object.assign(this, init);
  }
}
