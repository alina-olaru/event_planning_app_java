package com.firmaevenimente.firmaevenimente.models.wizard;

public class AddEvenimentRaspuns {
    public boolean succes;
    public String mesaj;
    public int id_eveniment;

    public boolean isSucces() {
        return succes;
    }

    public void setSucces(boolean succes) {
        this.succes = succes;
    }

    public String getMesaj() {
        return mesaj;
    }

    public void setMesaj(String mesaj) {
        this.mesaj = mesaj;
    }

    public int getId_eveniment() {
        return id_eveniment;
    }

    public void setId_eveniment(int id_eveniment) {
        this.id_eveniment = id_eveniment;
    }
}
