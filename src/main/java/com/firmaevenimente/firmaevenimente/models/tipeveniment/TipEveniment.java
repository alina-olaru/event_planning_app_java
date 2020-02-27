package com.firmaevenimente.firmaevenimente.models.tipeveniment;

public class TipEveniment {
    int id_tip_eveniment;
    String nume_categorie_eveniment;
    int numar_evenimente_organizate_per_categorie;
    String imagine_tip_eveniment;

    public TipEveniment() {
    }

    public TipEveniment(int id_tip_eveniment, String nume_categorie_eveniment, int numar_evenimente_organizate_per_categorie, String imagine_tip_eveniment) {
        this.id_tip_eveniment = id_tip_eveniment;
        this.nume_categorie_eveniment = nume_categorie_eveniment;
        this.numar_evenimente_organizate_per_categorie = numar_evenimente_organizate_per_categorie;
        this.imagine_tip_eveniment = imagine_tip_eveniment;
    }

    public int getId_tip_eveniment() {
        return id_tip_eveniment;
    }

    public void setId_tip_eveniment(int id_tip_eveniment) {
        this.id_tip_eveniment = id_tip_eveniment;
    }

    public String getNume_categorie_eveniment() {
        return nume_categorie_eveniment;
    }

    public void setNume_categorie_eveniment(String nume_categorie_eveniment) {
        this.nume_categorie_eveniment = nume_categorie_eveniment;
    }

    public int getNumar_evenimente_organizate_per_categorie() {
        return numar_evenimente_organizate_per_categorie;
    }

    public void setNumar_evenimente_organizate_per_categorie(int numar_evenimente_organizate_per_categorie) {
        this.numar_evenimente_organizate_per_categorie = numar_evenimente_organizate_per_categorie;
    }

    public String getImagine_tip_eveniment() {
        return imagine_tip_eveniment;
    }

    public void setImagine_tip_eveniment(String imagine_tip_eveniment) {
        this.imagine_tip_eveniment = imagine_tip_eveniment;
    }
}
