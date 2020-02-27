package com.firmaevenimente.firmaevenimente.models.tiplocatie;

public class TipLocatie {
    int id_tip_locatie;
    String nume_categorie_locatie;
    String descriere;
    String imagine_tip_locatie;

    public TipLocatie() {
    }

    public TipLocatie(int id_tip_locatie, String nume_categorie_locatie, String descriere, String imagine_tip_locatie) {
        this.id_tip_locatie = id_tip_locatie;
        this.nume_categorie_locatie = nume_categorie_locatie;
        this.descriere = descriere;
        this.imagine_tip_locatie = imagine_tip_locatie;
    }

    public int getId_tip_locatie() {
        return id_tip_locatie;
    }

    public void setId_tip_locatie(int id_tip_locatie) {
        this.id_tip_locatie = id_tip_locatie;
    }

    public String getNume_categorie_locatie() {
        return nume_categorie_locatie;
    }

    public void setNume_categorie_locatie(String nume_categorie_locatie) {
        this.nume_categorie_locatie = nume_categorie_locatie;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getImagine_tip_locatie() {
        return imagine_tip_locatie;
    }

    public void setImagine_tip_locatie(String imagine_tip_locatie) {
        this.imagine_tip_locatie = imagine_tip_locatie;
    }
}
