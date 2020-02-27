export class TipMomentArtistic {
  id_tip_moment: number;
  nume_categorie_moment_artistic: string;
  imagine_tip_moment_artistic: string;
  imagine_tip_moment_artistic_src: any;

  public constructor(init?: Partial<TipMomentArtistic>) {
    Object.assign(this, init);
  }
}
