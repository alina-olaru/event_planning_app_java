export class SubTipEveniment {
  id_sub_eveniment: number;
  id_tip_eveniment: number;
  nume_categorie_sub_eveniment: string;
  nume_categorie_eveniment: string;
  numar_evenimente_organizate_per_sub_eveniment: number;
  descriere: string;
  imagine_sub_eveniment: string;
  imagine_sub_eveniment_src: any;

  public constructor(init?: Partial<SubTipEveniment>) {
    Object.assign(this, init);
  }
}
