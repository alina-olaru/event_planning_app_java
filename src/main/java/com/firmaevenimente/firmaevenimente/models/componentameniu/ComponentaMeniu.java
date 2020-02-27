package com.firmaevenimente.firmaevenimente.models.componentameniu;

public class ComponentaMeniu {
    int id_preparat;
    int id_tip_meniu;
    String nume_preparat;
    String nume_meniu;
    float cantitate;
    String alergeni;

    public ComponentaMeniu() {
    }

    public ComponentaMeniu(int id_preparat, int id_tip_meniu, String nume_preparat, String nume_meniu, float cantitate, String alergeni) {
        this.id_preparat = id_preparat;
        this.id_tip_meniu = id_tip_meniu;
        this.nume_preparat = nume_preparat;
        this.nume_meniu = nume_meniu;
        this.cantitate = cantitate;
        this.alergeni = alergeni;
    }

    public int getId_preparat() {
        return id_preparat;
    }

    public void setId_preparat(int id_preparat) {
        this.id_preparat = id_preparat;
    }

    public int getId_tip_meniu() {
        return id_tip_meniu;
    }

    public void setId_tip_meniu(int id_tip_meniu) {
        this.id_tip_meniu = id_tip_meniu;
    }

    public String getNume_preparat() {
        return nume_preparat;
    }

    public void setNume_preparat(String nume_preparat) {
        this.nume_preparat = nume_preparat;
    }

    public String getNume_meniu() {
        return nume_meniu;
    }

    public void setNume_meniu(String nume_meniu) {
        this.nume_meniu = nume_meniu;
    }

    public float getCantitate() {
        return cantitate;
    }

    public void setCantitate(float cantitate) {
        this.cantitate = cantitate;
    }

    public String getAlergeni() {
        return alergeni;
    }

    public void setAlergeni(String alergeni) {
        this.alergeni = alergeni;
    }
}
