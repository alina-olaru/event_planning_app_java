export class TipServireMeniu {

  id_tip_servire_meniu: number;
  denumire_tip_servire: string;
  imagine_tip_servire: string;
  imagine_tip_servire_src: any;

  public constructor(init?: Partial<TipServireMeniu>) {
    Object.assign(this, init);
  }
}
