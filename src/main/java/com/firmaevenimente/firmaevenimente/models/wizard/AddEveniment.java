package com.firmaevenimente.firmaevenimente.models.wizard;

import java.util.ArrayList;
import java.util.Date;

public class AddEveniment {
    public int id_eveniment;
    public int id_utilizator;
    public int id_sub_eveniment;
    public int id_locatie;
    public Date data_inceput_eveniment;
    public Date data_sfarsit_eveniment;
    public String mentiuni;
    public ArrayList<BauturaEveniment> bauturaEveniment;
    public ArrayList<ElementeDesignEveniment> elementeDesignEveniment;
    public ArrayList<MomenteArtisticeEveniment> momenteArtisticeEveniment;
    public ArrayList<MediaEveniment> mediaEveniment;
    public ArrayList<TipMeniuEveniment> tipMeniuEveniment;
    public ArrayList<ConfigurariTipAccesEveniment> configurariTipAccesEveniment;
}
