package com.firmaevenimente.firmaevenimente.models.bautura;

import java.sql.Blob;

public class Bautura {
    int id_bautura;
    float pret_pret_bucata;
    float pret_per_bax;
    String nume_bautura;
    float gramaj;
    String imagine_bautura;

    public Bautura() {
    }

    public Bautura(int id_bautura, float pret_pret_bucata, float pret_per_bax, String nume_bautura, float gramaj, String imagine_bautura) {
        this.id_bautura = id_bautura;
        this.pret_pret_bucata = pret_pret_bucata;
        this.pret_per_bax = pret_per_bax;
        this.nume_bautura = nume_bautura;
        this.gramaj = gramaj;
        this.imagine_bautura = imagine_bautura;
    }

    public int getId_bautura() {
        return id_bautura;
    }

    public void setId_bautura(int id_bautura) {
        this.id_bautura = id_bautura;
    }

    public float getPret_pret_bucata() {
        return pret_pret_bucata;
    }

    public void setPret_pret_bucata(float pret_pret_bucata) {
        this.pret_pret_bucata = pret_pret_bucata;
    }

    public float getPret_per_bax() {
        return pret_per_bax;
    }

    public void setPret_per_bax(float pret_per_bax) {
        this.pret_per_bax = pret_per_bax;
    }

    public String getNume_bautura() {
        return nume_bautura;
    }

    public void setNume_bautura(String nume_bautura) {
        this.nume_bautura = nume_bautura;
    }

    public float getGramaj() {
        return gramaj;
    }

    public void setGramaj(float gramaj) {
        this.gramaj = gramaj;
    }

    public String getImagine_bautura() {
        return imagine_bautura;
    }

    public void setImagine_bautura(String imagine_bautura) {
        this.imagine_bautura = imagine_bautura;
    }
}
