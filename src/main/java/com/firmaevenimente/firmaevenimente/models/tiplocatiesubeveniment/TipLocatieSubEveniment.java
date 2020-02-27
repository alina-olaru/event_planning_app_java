package com.firmaevenimente.firmaevenimente.models.tiplocatiesubeveniment;

public class TipLocatieSubEveniment {
    int id_sub_eveniment;
    int id_tip_locatie;
    String nume_categorie_sub_eveniment;
    String nume_categorie_locatie;

    public TipLocatieSubEveniment() {
    }

    public TipLocatieSubEveniment(int id_sub_eveniment, int id_tip_locatie, String nume_categorie_sub_eveniment, String nume_categorie_locatie) {
        this.id_sub_eveniment = id_sub_eveniment;
        this.id_tip_locatie = id_tip_locatie;
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
        this.nume_categorie_locatie = nume_categorie_locatie;
    }

    public int getId_sub_eveniment() {
        return id_sub_eveniment;
    }

    public void setId_sub_eveniment(int id_sub_eveniment) {
        this.id_sub_eveniment = id_sub_eveniment;
    }

    public int getId_tip_locatie() {
        return id_tip_locatie;
    }

    public void setId_tip_locatie(int id_tip_locatie) {
        this.id_tip_locatie = id_tip_locatie;
    }

    public String getNume_categorie_sub_eveniment() {
        return nume_categorie_sub_eveniment;
    }

    public void setNume_categorie_sub_eveniment(String nume_categorie_sub_eveniment) {
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
    }

    public String getNume_categorie_locatie() {
        return nume_categorie_locatie;
    }

    public void setNume_categorie_locatie(String nume_categorie_locatie) {
        this.nume_categorie_locatie = nume_categorie_locatie;
    }
}
