export class ElementeDesign {
  id_element_design: number;
  nume_element: string;
  culoare: string;
  cantitate: number;
  dimensiuni: string;
  pret_per_element: number;
  discount: number;
  numar_minim_elemente_pentru_reducere: number;
  imagine_element_design: string;
  imagine_element_design_src: any;

  public constructor(init?: Partial<ElementeDesign>) {
    Object.assign(this, init);
  }
}
