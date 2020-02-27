export class TipMedia {

  id_tip_media: number;
  nume_media: string;
  imagine_tip_media: string;
  imagine_tip_media_src: any;

  public constructor(init?: Partial<TipMedia>) {
    Object.assign(this, init);
  }
}
