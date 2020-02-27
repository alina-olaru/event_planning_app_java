export class Locatie {

    id_locatie:number;
    id_sub_locatie:number;
    nume_locatie: string;
    nume_categorie_tip_locatie: string;
    tara: string;
    oras: string;
    adresa: string;
    strada: string;
    dimensiune_mp:number;
    capacitate_maxima:number;
    pret_inchiriere_per_24h:number;
    imagine_locatie: string;
    imagine_locatie_src: any;

  public constructor(init?: Partial<Locatie>) {
    Object.assign(this, init);
  }
}
