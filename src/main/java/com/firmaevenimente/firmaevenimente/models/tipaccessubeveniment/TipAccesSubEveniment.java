package com.firmaevenimente.firmaevenimente.models.tipaccessubeveniment;

public class TipAccesSubEveniment {
    int id_sub_eveniment;
    int id_acces;
    String nume_categorie_sub_eveniment;
    String modalitate_acces;

    public TipAccesSubEveniment() {
    }

    public TipAccesSubEveniment(int id_sub_eveniment, int id_acces, String nume_categorie_sub_eveniment, String modalitate_acces) {
        this.id_sub_eveniment = id_sub_eveniment;
        this.id_acces = id_acces;
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
        this.modalitate_acces = modalitate_acces;
    }

    public int getId_sub_eveniment() {
        return id_sub_eveniment;
    }

    public void setId_sub_eveniment(int id_sub_eveniment) {
        this.id_sub_eveniment = id_sub_eveniment;
    }

    public int getId_acces() {
        return id_acces;
    }

    public void setId_acces(int id_acces) {
        this.id_acces = id_acces;
    }

    public String getNume_categorie_sub_eveniment() {
        return nume_categorie_sub_eveniment;
    }

    public void setNume_categorie_sub_eveniment(String nume_categorie_sub_eveniment) {
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
    }

    public String getModalitate_acces() {
        return modalitate_acces;
    }

    public void setModalitate_acces(String modalitate_acces) {
        this.modalitate_acces = modalitate_acces;
    }
}
