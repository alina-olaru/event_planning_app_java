package com.firmaevenimente.firmaevenimente.models.wizard;

import java.util.Date;

public class ConfigurariTipAccesEveniment {
    int id_configurari_acces;
    int cantitate_acces;
    float pret_acces;
    float discount_avans;
    float discount_student;
    float cost_realizare_total;
    float cost_unitar_tip_acces;
    Date data_inceput_vanzare;
    Date data_final_vanzare;

    public ConfigurariTipAccesEveniment() {
    }

    public ConfigurariTipAccesEveniment(int id_configurari_acces, int cantitate_acces, float pret_acces, float discount_avans, float discount_student, float cost_realizare_total, float cost_unitar_tip_acces, Date data_inceput_vanzare, Date data_final_vanzare) {
        this.id_configurari_acces = id_configurari_acces;
        this.cantitate_acces = cantitate_acces;
        this.pret_acces = pret_acces;
        this.discount_avans = discount_avans;
        this.discount_student = discount_student;
        this.cost_realizare_total = cost_realizare_total;
        this.cost_unitar_tip_acces = cost_unitar_tip_acces;
        this.data_inceput_vanzare = data_inceput_vanzare;
        this.data_final_vanzare = data_final_vanzare;
    }

    public int getId_configurari_acces() {
        return id_configurari_acces;
    }

    public void setId_configurari_acces(int id_configurari_acces) {
        this.id_configurari_acces = id_configurari_acces;
    }

    public int getCantitate_acces() {
        return cantitate_acces;
    }

    public void setCantitate_acces(int cantitate_acces) {
        this.cantitate_acces = cantitate_acces;
    }

    public float getPret_acces() {
        return pret_acces;
    }

    public void setPret_acces(float pret_acces) {
        this.pret_acces = pret_acces;
    }

    public float getDiscount_avans() {
        return discount_avans;
    }

    public void setDiscount_avans(float discount_avans) {
        this.discount_avans = discount_avans;
    }

    public float getDiscount_student() {
        return discount_student;
    }

    public void setDiscount_student(float discount_student) {
        this.discount_student = discount_student;
    }

    public float getCost_realizare_total() {
        return cost_realizare_total;
    }

    public void setCost_realizare_total(float cost_realizare_total) {
        this.cost_realizare_total = cost_realizare_total;
    }

    public float getCost_unitar_tip_acces() {
        return cost_unitar_tip_acces;
    }

    public void setCost_unitar_tip_acces(float cost_unitar_tip_acces) {
        this.cost_unitar_tip_acces = cost_unitar_tip_acces;
    }

    public Date getData_inceput_vanzare() {
        return data_inceput_vanzare;
    }

    public void setData_inceput_vanzare(Date data_inceput_vanzare) {
        this.data_inceput_vanzare = data_inceput_vanzare;
    }

    public Date getData_final_vanzare() {
        return data_final_vanzare;
    }

    public void setData_final_vanzare(Date data_final_vanzare) {
        this.data_final_vanzare = data_final_vanzare;
    }
}
