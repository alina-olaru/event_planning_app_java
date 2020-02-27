export class Media {

  id_media: number;
  id_tip_media: number;
  denumire: string;
  nume_media: string;
  pret: number;
  descriere: string;
  imagine_media: string;
  imagine_media_src: any;

  public constructor(init?: Partial<Media>) {
    Object.assign(this, init);
  }
}

