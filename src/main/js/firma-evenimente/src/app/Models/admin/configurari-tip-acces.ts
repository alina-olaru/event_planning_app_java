export class ConfigurariTipAcces {

  id_configurari_acces:number;
  id_acces:number;
  denumire_configurare_acces: string;
  modalitate_acces: string;
  cost_realizare:number;

  public constructor(init?: Partial<ConfigurariTipAcces>) {
    Object.assign(this, init);
  }
}
