package com.firmaevenimente.firmaevenimente.models.tiputilizatori;

public class TipUtilizator {
    int id_nivel_acces;
    String rol;

    public TipUtilizator() {
    }

    public TipUtilizator(int id_nivel_acces, String rol) {
        this.id_nivel_acces = id_nivel_acces;
        this.rol = rol;
    }

    public int getId_nivel_acces() {
        return id_nivel_acces;
    }

    public void setId_nivel_acces(int id_nivel_acces) {
        this.id_nivel_acces = id_nivel_acces;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
