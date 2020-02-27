package com.firmaevenimente.firmaevenimente.models.wizard;

public class TipMeniuEveniment {
    int id_tip_meniu;
    int cantitate_tip_meniu;
    float cost_total;
    float cost_unitar_tip_meniu;

    public TipMeniuEveniment() {
    }

    public TipMeniuEveniment(int id_tip_meniu, int cantitate_tip_meniu, float cost_total, float cost_unitar_tip_meniu) {
        this.id_tip_meniu = id_tip_meniu;
        this.cantitate_tip_meniu = cantitate_tip_meniu;
        this.cost_total = cost_total;
        this.cost_unitar_tip_meniu = cost_unitar_tip_meniu;
    }

    public int getId_tip_meniu() {
        return id_tip_meniu;
    }

    public void setId_tip_meniu(int id_tip_meniu) {
        this.id_tip_meniu = id_tip_meniu;
    }

    public int getCantitate_tip_meniu() {
        return cantitate_tip_meniu;
    }

    public void setCantitate_tip_meniu(int cantitate_tip_meniu) {
        this.cantitate_tip_meniu = cantitate_tip_meniu;
    }

    public float getCost_total() {
        return cost_total;
    }

    public void setCost_total(float cost_total) {
        this.cost_total = cost_total;
    }

    public float getCost_unitar_tip_meniu() {
        return cost_unitar_tip_meniu;
    }

    public void setCost_unitar_tip_meniu(float cost_unitar_tip_meniu) {
        this.cost_unitar_tip_meniu = cost_unitar_tip_meniu;
    }
}
