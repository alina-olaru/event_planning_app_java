package com.firmaevenimente.firmaevenimente.models.sublocatie;

public class SubLocatie {
    int id_sub_locatie;
    int id_tip_locatie;
    String nume_tip_locatie;
    String nume_categorie_tip_locatie;
    String anotimp_potrivit;
    String imagine_sub_locatie;

    public SubLocatie() {
    }

    public SubLocatie(int id_sub_locatie, int id_tip_locatie, String nume_tip_locatie, String nume_categorie_tip_locatie, String anotimp_potrivit, String imagine_sub_locatie) {
        this.id_sub_locatie = id_sub_locatie;
        this.id_tip_locatie = id_tip_locatie;
        this.nume_tip_locatie = nume_tip_locatie;
        this.nume_categorie_tip_locatie = nume_categorie_tip_locatie;
        this.anotimp_potrivit = anotimp_potrivit;
        this.imagine_sub_locatie = imagine_sub_locatie;
    }

    public int getId_sub_locatie() {
        return id_sub_locatie;
    }

    public void setId_sub_locatie(int id_sub_locatie) {
        this.id_sub_locatie = id_sub_locatie;
    }

    public int getId_tip_locatie() {
        return id_tip_locatie;
    }

    public void setId_tip_locatie(int id_tip_locatie) {
        this.id_tip_locatie = id_tip_locatie;
    }

    public String getNume_tip_locatie() {
        return nume_tip_locatie;
    }

    public void setNume_tip_locatie(String nume_tip_locatie) {
        this.nume_tip_locatie = nume_tip_locatie;
    }

    public String getNume_categorie_tip_locatie() {
        return nume_categorie_tip_locatie;
    }

    public void setNume_categorie_tip_locatie(String nume_categorie_tip_locatie) {
        this.nume_categorie_tip_locatie = nume_categorie_tip_locatie;
    }

    public String getAnotimp_potrivit() {
        return anotimp_potrivit;
    }

    public void setAnotimp_potrivit(String anotimp_potrivit) {
        this.anotimp_potrivit = anotimp_potrivit;
    }

    public String getImagine_sub_locatie() {
        return imagine_sub_locatie;
    }

    public void setImagine_sub_locatie(String imagine_sub_locatie) {
        this.imagine_sub_locatie = imagine_sub_locatie;
    }
}
