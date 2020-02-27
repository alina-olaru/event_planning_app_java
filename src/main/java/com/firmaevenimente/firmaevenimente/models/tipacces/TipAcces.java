package com.firmaevenimente.firmaevenimente.models.tipacces;

public class TipAcces {
    int id_acces;
    String modalitate_acces;

    public TipAcces() {
    }

    public TipAcces(int id_acces, String modalitate_acces) {
        this.id_acces = id_acces;
        this.modalitate_acces = modalitate_acces;
    }

    public int getId_acces() {
        return id_acces;
    }

    public void setId_acces(int id_acces) {
        this.id_acces = id_acces;
    }

    public String getModalitate_acces() {
        return modalitate_acces;
    }

    public void setModalitate_acces(String modalitate_acces) {
        this.modalitate_acces = modalitate_acces;
    }
}
