package com.firmaevenimente.firmaevenimente.models.wizard;

public class MediaEveniment {
    int id_media;
    int cantitate;
    float cost_unitar;
    float cost_total;

    public MediaEveniment() {
    }

    public MediaEveniment(int id_media, int cantitate, float cost_unitar, float cost_total) {
        this.id_media = id_media;
        this.cantitate = cantitate;
        this.cost_unitar = cost_unitar;
        this.cost_total = cost_total;
    }

    public int getId_media() {
        return id_media;
    }

    public void setId_media(int id_media) {
        this.id_media = id_media;
    }

    public int getCantitate() {
        return cantitate;
    }

    public void setCantitate(int cantitate) {
        this.cantitate = cantitate;
    }

    public float getCost_unitar() {
        return cost_unitar;
    }

    public void setCost_unitar(float cost_unitar) {
        this.cost_unitar = cost_unitar;
    }

    public float getCost_total() {
        return cost_total;
    }

    public void setCost_total(float cost_total) {
        this.cost_total = cost_total;
    }
}
