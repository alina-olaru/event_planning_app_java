package com.firmaevenimente.firmaevenimente.models.tipmeniu;

public class TipMeniu {
    int id_tip_meniu;
    int id_tip_servire_meniu;
    String nume_meniu;
    String denumire_tip_servire;
    String clienti_targetati;
    float reducere;
    int minim_portii_pentru_reducere;
    float cost_tip_meniu;
    String imagine_meniu;

    public TipMeniu() {
    }

    public TipMeniu(int id_tip_meniu, int id_tip_servire_meniu, String nume_meniu, String denumire_tip_servire, String clienti_targetati, float reducere, int minim_portii_pentru_reducere, float cost_tip_meniu, String imagine_meniu) {
        this.id_tip_meniu = id_tip_meniu;
        this.id_tip_servire_meniu = id_tip_servire_meniu;
        this.nume_meniu = nume_meniu;
        this.denumire_tip_servire = denumire_tip_servire;
        this.clienti_targetati = clienti_targetati;
        this.reducere = reducere;
        this.minim_portii_pentru_reducere = minim_portii_pentru_reducere;
        this.cost_tip_meniu = cost_tip_meniu;
        this.imagine_meniu = imagine_meniu;
    }

    public int getId_tip_meniu() {
        return id_tip_meniu;
    }

    public void setId_tip_meniu(int id_tip_meniu) {
        this.id_tip_meniu = id_tip_meniu;
    }

    public int getId_tip_servire_meniu() {
        return id_tip_servire_meniu;
    }

    public void setId_tip_servire_meniu(int id_tip_servire_meniu) {
        this.id_tip_servire_meniu = id_tip_servire_meniu;
    }

    public String getNume_meniu() {
        return nume_meniu;
    }

    public void setNume_meniu(String nume_meniu) {
        this.nume_meniu = nume_meniu;
    }

    public String getDenumire_tip_servire() {
        return denumire_tip_servire;
    }

    public void setDenumire_tip_servire(String denumire_tip_servire) {
        this.denumire_tip_servire = denumire_tip_servire;
    }

    public String getClienti_targetati() {
        return clienti_targetati;
    }

    public void setClienti_targetati(String clienti_targetati) {
        this.clienti_targetati = clienti_targetati;
    }

    public float getReducere() {
        return reducere;
    }

    public void setReducere(float reducere) {
        this.reducere = reducere;
    }

    public int getMinim_portii_pentru_reducere() {
        return minim_portii_pentru_reducere;
    }

    public void setMinim_portii_pentru_reducere(int minim_portii_pentru_reducere) {
        this.minim_portii_pentru_reducere = minim_portii_pentru_reducere;
    }

    public float getCost_tip_meniu() {
        return cost_tip_meniu;
    }

    public void setCost_tip_meniu(float cost_tip_meniu) {
        this.cost_tip_meniu = cost_tip_meniu;
    }

    public String getImagine_meniu() {
        return imagine_meniu;
    }

    public void setImagine_meniu(String imagine_meniu) {
        this.imagine_meniu = imagine_meniu;
    }
}
