export class Organizatori {

  id_organizator: number;
  nume: string;
  prenume: string;
  adresa_mail: string;
  numar_contact: string;
  numar_evenimente_organizate: number;

  public constructor(init?: Partial<Organizatori>) {
    Object.assign(this, init);
  }
}
