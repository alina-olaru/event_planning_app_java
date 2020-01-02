package com.firmaevenimente.firmaevenimente.models;

public class User {

    public int getID_UTILIZATOR() {
        return ID_UTILIZATOR;
    }

    public void setID_UTILIZATOR(int ID_UTILIZATOR) {
        this.ID_UTILIZATOR = ID_UTILIZATOR;
    }

    int ID_UTILIZATOR;

    public String getNUME() {
        return NUME;
    }

    public void setNUME(String NUME) {
        this.NUME = NUME;
    }

    String NUME;

    public String getPRENUME() {
        return PRENUME;
    }

    public void setPRENUME(String PRENUME) {
        this.PRENUME = PRENUME;
    }

    String PRENUME;

    public int getID_NIVEL_ACCES() {
        return ID_NIVEL_ACCES;
    }

    public void setID_NIVEL_ACCES(int ID_NIVEL_ACCES) {
        this.ID_NIVEL_ACCES = ID_NIVEL_ACCES;
    }

    public User(int ID_UTILIZATOR, String NUME, String PRENUME, int ID_NIVEL_ACCES) {
        this.ID_UTILIZATOR = ID_UTILIZATOR;
        this.NUME = NUME;
        this.PRENUME = PRENUME;
        this.ID_NIVEL_ACCES = ID_NIVEL_ACCES;
    }

    int ID_NIVEL_ACCES;


}
