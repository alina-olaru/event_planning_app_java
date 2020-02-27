export class MomenteArtistice {

  id_moment_artistic: number;
  id_tip_moment: number;
  nume_tip_moment_artistic: string;
  nume_categorie_moment_artistic: string;
  timp_moment: number;
  pret_per_moment: number;
  numar_persoane_implicate: number;

  public constructor(init?: Partial<MomenteArtistice>) {
    Object.assign(this, init);
  }

}
