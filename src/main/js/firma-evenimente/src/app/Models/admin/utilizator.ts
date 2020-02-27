export class Utilizator {
  id_utilizator: number;
  id_nivel_acces: number;
  nume: string;
  prenume: string;
  numar_telefon: string;
  adresa_mail: string;
  numar_evenimente_create: string;
  username: string;
  parola: string;
  rol: string;

  public constructor(init?: Partial<Utilizator>) {
    Object.assign(this, init);
  }

}
