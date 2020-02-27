package com.firmaevenimente.firmaevenimente.models.momenteartistice;

public class MomenteArtistice {
    int id_moment_artistic;
    int id_tip_moment;
    String nume_tip_moment_artistic;
    String nume_categorie_moment_artistic;
    float timp_moment;
    float pret_per_moment;
    int numar_persoane_implicate;

    public MomenteArtistice() {
    }

    public MomenteArtistice(int id_moment_artistic, int id_tip_moment, String nume_tip_moment_artistic, String nume_categorie_moment_artistic, float timp_moment, float pret_per_moment, int numar_persoane_implicate) {
        this.id_moment_artistic = id_moment_artistic;
        this.id_tip_moment = id_tip_moment;
        this.nume_tip_moment_artistic = nume_tip_moment_artistic;
        this.nume_categorie_moment_artistic = nume_categorie_moment_artistic;
        this.timp_moment = timp_moment;
        this.pret_per_moment = pret_per_moment;
        this.numar_persoane_implicate = numar_persoane_implicate;
    }

    public int getId_moment_artistic() {
        return id_moment_artistic;
    }

    public void setId_moment_artistic(int id_moment_artistic) {
        this.id_moment_artistic = id_moment_artistic;
    }

    public int getId_tip_moment() {
        return id_tip_moment;
    }

    public void setId_tip_moment(int id_tip_moment) {
        this.id_tip_moment = id_tip_moment;
    }

    public String getNume_tip_moment_artistic() {
        return nume_tip_moment_artistic;
    }

    public void setNume_tip_moment_artistic(String nume_tip_moment_artistic) {
        this.nume_tip_moment_artistic = nume_tip_moment_artistic;
    }

    public String getNume_categorie_moment_artistic() {
        return nume_categorie_moment_artistic;
    }

    public void setNume_categorie_moment_artistic(String nume_categorie_moment_artistic) {
        this.nume_categorie_moment_artistic = nume_categorie_moment_artistic;
    }

    public float getTimp_moment() {
        return timp_moment;
    }

    public void setTimp_moment(float timp_moment) {
        this.timp_moment = timp_moment;
    }

    public float getPret_per_moment() {
        return pret_per_moment;
    }

    public void setPret_per_moment(float pret_per_moment) {
        this.pret_per_moment = pret_per_moment;
    }

    public int getNumar_persoane_implicate() {
        return numar_persoane_implicate;
    }

    public void setNumar_persoane_implicate(int numar_persoane_implicate) {
        this.numar_persoane_implicate = numar_persoane_implicate;
    }
}
