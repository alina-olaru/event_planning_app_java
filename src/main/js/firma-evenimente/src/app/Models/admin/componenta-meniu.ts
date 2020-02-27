export class ComponentaMeniu {
  id_preparat: number;
  id_tip_meniu: number;
  nume_preparat: string;
  nume_meniu: string;
  cantitate: number;
  alergeni: string;

  public constructor(init?: Partial<ComponentaMeniu>) {
    Object.assign(this, init);
  }
}
