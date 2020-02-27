package com.firmaevenimente.firmaevenimente.models.home;

import java.util.Date;

public class HomeEveniment {
    int id_eveniment;
    Date data_inceput_eveniment;
    Date data_sfarsit_eveniment;
    String mentiuni;
    int id_sub_eveniment;
    String nume_categorie_sub_eveniment;
    int id_locatie;
    String nume_locatie;
    String tara;
    String oras;
    float cost_acces;
    float cost_bautura;
    float cost_elemente_design;
    float cost_media;
    float cost_meniu;
    float cost_momente_artistice;
    float cost_total_eveniment;

    public HomeEveniment() {
    }

    public HomeEveniment(int id_eveniment, Date data_inceput_eveniment, Date data_sfarsit_eveniment, String mentiuni, int id_sub_eveniment, String nume_categorie_sub_eveniment, int id_locatie, String nume_locatie, String tara, String oras, float cost_acces, float cost_bautura, float cost_elemente_design, float cost_media, float cost_meniu, float cost_momente_artistice, float cost_total_eveniment) {
        this.id_eveniment = id_eveniment;
        this.data_inceput_eveniment = data_inceput_eveniment;
        this.data_sfarsit_eveniment = data_sfarsit_eveniment;
        this.mentiuni = mentiuni;
        this.id_sub_eveniment = id_sub_eveniment;
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
        this.id_locatie = id_locatie;
        this.nume_locatie = nume_locatie;
        this.tara = tara;
        this.oras = oras;
        this.cost_acces = cost_acces;
        this.cost_bautura = cost_bautura;
        this.cost_elemente_design = cost_elemente_design;
        this.cost_media = cost_media;
        this.cost_meniu = cost_meniu;
        this.cost_momente_artistice = cost_momente_artistice;
        this.cost_total_eveniment = cost_total_eveniment;
    }

    public int getId_eveniment() {
        return id_eveniment;
    }

    public void setId_eveniment(int id_eveniment) {
        this.id_eveniment = id_eveniment;
    }

    public Date getData_inceput_eveniment() {
        return data_inceput_eveniment;
    }

    public void setData_inceput_eveniment(Date data_inceput_eveniment) {
        this.data_inceput_eveniment = data_inceput_eveniment;
    }

    public Date getData_sfarsit_eveniment() {
        return data_sfarsit_eveniment;
    }

    public void setData_sfarsit_eveniment(Date data_sfarsit_eveniment) {
        this.data_sfarsit_eveniment = data_sfarsit_eveniment;
    }

    public String getMentiuni() {
        return mentiuni;
    }

    public void setMentiuni(String mentiuni) {
        this.mentiuni = mentiuni;
    }

    public int getId_sub_eveniment() {
        return id_sub_eveniment;
    }

    public void setId_sub_eveniment(int id_sub_eveniment) {
        this.id_sub_eveniment = id_sub_eveniment;
    }

    public String getNume_categorie_sub_eveniment() {
        return nume_categorie_sub_eveniment;
    }

    public void setNume_categorie_sub_eveniment(String nume_categorie_sub_eveniment) {
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
    }

    public int getId_locatie() {
        return id_locatie;
    }

    public void setId_locatie(int id_locatie) {
        this.id_locatie = id_locatie;
    }

    public String getNume_locatie() {
        return nume_locatie;
    }

    public void setNume_locatie(String nume_locatie) {
        this.nume_locatie = nume_locatie;
    }

    public String getTara() {
        return tara;
    }

    public void setTara(String tara) {
        this.tara = tara;
    }

    public String getOras() {
        return oras;
    }

    public void setOras(String oras) {
        this.oras = oras;
    }

    public float getCost_acces() {
        return cost_acces;
    }

    public void setCost_acces(float cost_acces) {
        this.cost_acces = cost_acces;
    }

    public float getCost_bautura() {
        return cost_bautura;
    }

    public void setCost_bautura(float cost_bautura) {
        this.cost_bautura = cost_bautura;
    }

    public float getCost_elemente_design() {
        return cost_elemente_design;
    }

    public void setCost_elemente_design(float cost_elemente_design) {
        this.cost_elemente_design = cost_elemente_design;
    }

    public float getCost_media() {
        return cost_media;
    }

    public void setCost_media(float cost_media) {
        this.cost_media = cost_media;
    }

    public float getCost_meniu() {
        return cost_meniu;
    }

    public void setCost_meniu(float cost_meniu) {
        this.cost_meniu = cost_meniu;
    }

    public float getCost_momente_artistice() {
        return cost_momente_artistice;
    }

    public void setCost_momente_artistice(float cost_momente_artistice) {
        this.cost_momente_artistice = cost_momente_artistice;
    }

    public float getCost_total_eveniment() {
        return cost_total_eveniment;
    }

    public void setCost_total_eveniment(float cost_total_eveniment) {
        this.cost_total_eveniment = cost_total_eveniment;
    }
}
