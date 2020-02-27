package com.firmaevenimente.firmaevenimente.models.subtipeveniment;

public class SubTipEveniment {
    int id_sub_eveniment;
    int id_tip_eveniment;
    String nume_categorie_sub_eveniment;
    String nume_categorie_eveniment;
    int numar_evenimente_organizate_per_sub_eveniment;
    String descriere;
    String imagine_sub_eveniment;

    public SubTipEveniment() {
    }

    public SubTipEveniment(int id_sub_eveniment, int id_tip_eveniment, String nume_categorie_sub_eveniment, String nume_categorie_eveniment, int numar_evenimente_organizate_per_sub_eveniment, String descriere, String imagine_sub_eveniment) {
        this.id_sub_eveniment = id_sub_eveniment;
        this.id_tip_eveniment = id_tip_eveniment;
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
        this.nume_categorie_eveniment = nume_categorie_eveniment;
        this.numar_evenimente_organizate_per_sub_eveniment = numar_evenimente_organizate_per_sub_eveniment;
        this.descriere = descriere;
        this.imagine_sub_eveniment = imagine_sub_eveniment;
    }

    public int getId_sub_eveniment() {
        return id_sub_eveniment;
    }

    public void setId_sub_eveniment(int id_sub_eveniment) {
        this.id_sub_eveniment = id_sub_eveniment;
    }

    public int getId_tip_eveniment() {
        return id_tip_eveniment;
    }

    public void setId_tip_eveniment(int id_tip_eveniment) {
        this.id_tip_eveniment = id_tip_eveniment;
    }

    public String getNume_categorie_sub_eveniment() {
        return nume_categorie_sub_eveniment;
    }

    public void setNume_categorie_sub_eveniment(String nume_categorie_sub_eveniment) {
        this.nume_categorie_sub_eveniment = nume_categorie_sub_eveniment;
    }

    public String getNume_categorie_eveniment() {
        return nume_categorie_eveniment;
    }

    public void setNume_categorie_eveniment(String nume_categorie_eveniment) {
        this.nume_categorie_eveniment = nume_categorie_eveniment;
    }

    public int getNumar_evenimente_organizate_per_sub_eveniment() {
        return numar_evenimente_organizate_per_sub_eveniment;
    }

    public void setNumar_evenimente_organizate_per_sub_eveniment(int numar_evenimente_organizate_per_sub_eveniment) {
        this.numar_evenimente_organizate_per_sub_eveniment = numar_evenimente_organizate_per_sub_eveniment;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getImagine_sub_eveniment() {
        return imagine_sub_eveniment;
    }

    public void setImagine_sub_eveniment(String imagine_sub_eveniment) {
        this.imagine_sub_eveniment = imagine_sub_eveniment;
    }
}
