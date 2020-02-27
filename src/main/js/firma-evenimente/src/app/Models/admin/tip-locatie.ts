export class TipLocatie {
  id_tip_locatie: number;
  nume_categorie_locatie: string;
  descriere: string;
  imagine_tip_locatie: string;
  imagine_tip_locatie_src: any;

  public constructor(init?: Partial<TipLocatie>) {
    Object.assign(this, init);
  }
}
