package com.firmaevenimente.firmaevenimente.models.configuraritipacces;

public class ConfigurariTipAcces {
    int id_configurari_acces;
    int id_acces;
    String denumire_configurare_acces;
    String modalitate_acces;
    float cost_realizare;

    public ConfigurariTipAcces() {
    }

    public ConfigurariTipAcces(int id_configurari_acces, int id_acces, String denumire_configurare_acces, String modalitate_acces, float cost_realizare) {
        this.id_configurari_acces = id_configurari_acces;
        this.id_acces = id_acces;
        this.denumire_configurare_acces = denumire_configurare_acces;
        this.modalitate_acces = modalitate_acces;
        this.cost_realizare = cost_realizare;
    }

    public int getId_configurari_acces() {
        return id_configurari_acces;
    }

    public void setId_configurari_acces(int id_configurari_acces) {
        this.id_configurari_acces = id_configurari_acces;
    }

    public int getId_acces() {
        return id_acces;
    }

    public void setId_acces(int id_acces) {
        this.id_acces = id_acces;
    }

    public String getDenumire_configurare_acces() {
        return denumire_configurare_acces;
    }

    public void setDenumire_configurare_acces(String denumire_configurare_acces) {
        this.denumire_configurare_acces = denumire_configurare_acces;
    }

    public String getModalitate_acces() {
        return modalitate_acces;
    }

    public void setModalitate_acces(String modalitate_acces) {
        this.modalitate_acces = modalitate_acces;
    }

    public float getCost_realizare() {
        return cost_realizare;
    }

    public void setCost_realizare(float cost_realizare) {
        this.cost_realizare = cost_realizare;
    }
}
