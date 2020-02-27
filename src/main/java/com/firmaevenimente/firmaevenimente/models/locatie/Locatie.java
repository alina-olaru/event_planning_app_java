package com.firmaevenimente.firmaevenimente.models.locatie;

public class Locatie {
    int id_locatie;
    int id_sub_locatie;
    String nume_locatie;
    String nume_categorie_tip_locatie;
    String tara;
    String oras;
    String adresa;
    String strada;
    Float dimensiune_mp;
    int capacitate_maxima;
    float pret_inchiriere_per_24h;
    String imagine_locatie;

    public Locatie() {
    }

    public Locatie(int id_locatie, int id_sub_locatie, String nume_locatie, String nume_categorie_tip_locatie, String tara, String oras, String adresa, String strada, Float dimensiune_mp, int capacitate_maxima, float pret_inchiriere_per_24h, String imagine_locatie) {
        this.id_locatie = id_locatie;
        this.id_sub_locatie = id_sub_locatie;
        this.nume_locatie = nume_locatie;
        this.nume_categorie_tip_locatie = nume_categorie_tip_locatie;
        this.tara = tara;
        this.oras = oras;
        this.adresa = adresa;
        this.strada = strada;
        this.dimensiune_mp = dimensiune_mp;
        this.capacitate_maxima = capacitate_maxima;
        this.pret_inchiriere_per_24h = pret_inchiriere_per_24h;
        this.imagine_locatie = imagine_locatie;
    }

    public int getId_locatie() {
        return id_locatie;
    }

    public void setId_locatie(int id_locatie) {
        this.id_locatie = id_locatie;
    }

    public int getId_sub_locatie() {
        return id_sub_locatie;
    }

    public void setId_sub_locatie(int id_sub_locatie) {
        this.id_sub_locatie = id_sub_locatie;
    }

    public String getNume_locatie() {
        return nume_locatie;
    }

    public void setNume_locatie(String nume_locatie) {
        this.nume_locatie = nume_locatie;
    }

    public String getNume_categorie_tip_locatie() {
        return nume_categorie_tip_locatie;
    }

    public void setNume_categorie_tip_locatie(String nume_categorie_tip_locatie) {
        this.nume_categorie_tip_locatie = nume_categorie_tip_locatie;
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

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getStrada() {
        return strada;
    }

    public void setStrada(String strada) {
        this.strada = strada;
    }

    public Float getDimensiune_mp() {
        return dimensiune_mp;
    }

    public void setDimensiune_mp(Float dimensiune_mp) {
        this.dimensiune_mp = dimensiune_mp;
    }

    public int getCapacitate_maxima() {
        return capacitate_maxima;
    }

    public void setCapacitate_maxima(int capacitate_maxima) {
        this.capacitate_maxima = capacitate_maxima;
    }

    public float getPret_inchiriere_per_24h() {
        return pret_inchiriere_per_24h;
    }

    public void setPret_inchiriere_per_24h(float pret_inchiriere_per_24h) {
        this.pret_inchiriere_per_24h = pret_inchiriere_per_24h;
    }

    public String getImagine_locatie() {
        return imagine_locatie;
    }

    public void setImagine_locatie(String imagine_locatie) {
        this.imagine_locatie = imagine_locatie;
    }
}
