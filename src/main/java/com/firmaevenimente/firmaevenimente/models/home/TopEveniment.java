package com.firmaevenimente.firmaevenimente.models.home;

public class TopEveniment {
    String nume_categorie_sub_eveniment;
    int numar_evenimente;

    public TopEveniment() {
    }

    public TopEveniment(String nume_categorie_sub_eveniment, int numar_evenimente) {
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
        this.numar_evenimente = numar_evenimente;
    }

    public String getNume_categorie_sub_eveniment() {
        return nume_categorie_sub_eveniment;
    }

    public void setNume_categorie_sub_eveniment(String nume_categorie_sub_eveniment) {
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
    }

    public int getNumar_evenimente() {
        return numar_evenimente;
    }

    public void setNumar_evenimente(int numar_evenimente) {
        this.numar_evenimente = numar_evenimente;
    }
}
