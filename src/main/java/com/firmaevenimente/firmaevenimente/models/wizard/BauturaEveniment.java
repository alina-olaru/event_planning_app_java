package com.firmaevenimente.firmaevenimente.models.wizard;

public class BauturaEveniment {
    int id_bautura;
    float pret_vanzare;
    int cantitate;
    float cost_total;
    float cost_unitar;

    public BauturaEveniment() {
    }

    public BauturaEveniment(int id_bautura, float pret_vanzare, int cantitate, float cost_total, float cost_unitar) {
        this.id_bautura = id_bautura;
        this.pret_vanzare = pret_vanzare;
        this.cantitate = cantitate;
        this.cost_total = cost_total;
        this.cost_unitar = cost_unitar;
    }

    public int getId_bautura() {
        return id_bautura;
    }

    public void setId_bautura(int id_bautura) {
        this.id_bautura = id_bautura;
    }

    public float getPret_vanzare() {
        return pret_vanzare;
    }

    public void setPret_vanzare(float pret_vanzare) {
        this.pret_vanzare = pret_vanzare;
    }

    public int getCantitate() {
        return cantitate;
    }

    public void setCantitate(int cantitate) {
        this.cantitate = cantitate;
    }

    public float getCost_total() {
        return cost_total;
    }

    public void setCost_total(float cost_total) {
        this.cost_total = cost_total;
    }

    public float getCost_unitar() {
        return cost_unitar;
    }

    public void setCost_unitar(float cost_unitar) {
        this.cost_unitar = cost_unitar;
    }
}
