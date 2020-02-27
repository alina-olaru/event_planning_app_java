package com.firmaevenimente.firmaevenimente.models.wizard;

public class ElementeDesignEveniment {
    int id_element_design;
    int cantitate;
    float cost_total;
    float cost_unitar;

    public ElementeDesignEveniment() {
    }

    public ElementeDesignEveniment(int id_element_design, int cantitate, float cost_total, float cost_unitar) {
        this.id_element_design = id_element_design;
        this.cantitate = cantitate;
        this.cost_total = cost_total;
        this.cost_unitar = cost_unitar;
    }

    public int getId_element_design() {
        return id_element_design;
    }

    public void setId_element_design(int id_element_design) {
        this.id_element_design = id_element_design;
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
