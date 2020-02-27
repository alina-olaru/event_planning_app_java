export class TipMeniu {
  id_tip_meniu: number;
  id_tip_servire_meniu: number;
  nume_meniu: string;
  denumire_tip_servire: string;
  clienti_targetati: string;
  reducere: number;
  minim_portii_pentru_reducere: number;
  cost_tip_meniu: number;
  imagine_meniu: string;
  imagine_meniu_src: any;

  public constructor(init?: Partial<TipMeniu>) {
    Object.assign(this, init);
  }
}
