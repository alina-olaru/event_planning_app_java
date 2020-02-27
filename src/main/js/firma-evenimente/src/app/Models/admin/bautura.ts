export class Bautura {
  id_bautura: number;
  pret_pret_bucata: number;
  pret_per_bax: number;
  nume_bautura: string;
  gramaj: number;
  imagine_bautura: string;
  imagine_bautura_src: any;

  public constructor(init?: Partial<Bautura>) {
    Object.assign(this, init);
  }
}
