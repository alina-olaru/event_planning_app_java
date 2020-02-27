export class TipLocatieSubEveniment {
  id_sub_eveniment: number;
  id_tip_locatie: number;
  nume_categorie_sub_eveniment: string;
  nume_categorie_locatie: string;

  public constructor(init?: Partial<TipLocatieSubEveniment>) {
    Object.assign(this, init);
  }
}
