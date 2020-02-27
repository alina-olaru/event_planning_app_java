export class TipEveniment {

  id_tip_eveniment: number;
  nume_categorie_eveniment: string;
  numar_evenimente_organizate_per_categorie: number;
  imagine_tip_eveniment: string;
  imagine_tip_eveniment_src: any;

  public constructor(init?: Partial<TipEveniment>) {
    Object.assign(this, init);
  }
}
