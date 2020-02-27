import { MomenteArtisticeEveniment } from './momente-artistice-eveniment';
import { ConfigurariTipAccesEveniment } from 'src/app/Models/home/configurari-tip-acces-eveniment';
import { TipMeniuEveniment } from './tip-meniu-eveniment';
import { MediaEveniment } from './media-eveniment';
import { ElementeDesignEveniment } from './elemente-design-eveniment';
import { BauturaEveniment } from './bautura-eveniment';
export class AddEveniment {
  id_utilizator: number;
  id_sub_eveniment: number;
  id_locatie: number;
  data_inceput_eveniment: Date;
  data_sfarsit_eveniment: Date;
  mentiuni: string;
  bauturaEveniment: BauturaEveniment[];
  elementeDesignEveniment: ElementeDesignEveniment[];
  momenteArtisticeEveniment: MomenteArtisticeEveniment[];
  mediaEveniment: MediaEveniment[];
  tipMeniuEveniment: TipMeniuEveniment[];
  configurariTipAccesEveniment: ConfigurariTipAccesEveniment[];
}
