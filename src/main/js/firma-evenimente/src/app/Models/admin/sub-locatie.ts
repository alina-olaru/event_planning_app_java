export class SubLocatie {
  id_sub_locatie: number;
  id_tip_locatie: number;
  nume_tip_locatie: string;
  nume_categorie_tip_locatie: string;
  anotimp_potrivit: string;
  imagine_sub_locatie: string;
  imagine_sub_locatie_src: any;

  public constructor(init?: Partial<SubLocatie>) {
    Object.assign(this, init);
  }
}
