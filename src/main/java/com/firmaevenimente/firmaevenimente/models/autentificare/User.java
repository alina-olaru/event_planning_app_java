package com.firmaevenimente.firmaevenimente.models.autentificare;

public class User {

    int id_utilizator;
    String nume;
    String prenume;
    int id_nivel_acces;
    String numar_telefon;
    String adresa_email;
    int numar_evenimente_create;

    public int getId_utilizator() {
        return id_utilizator;
    }

    public void setId_utilizator(int id_utilizator) {
        this.id_utilizator = id_utilizator;
    }


    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }


    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public int getId_nivel_acces() {
        return id_nivel_acces;
    }

    public void setId_nivel_acces(int id_nivel_acces) {
        this.id_nivel_acces = id_nivel_acces;
    }

    public String getNumar_telefon() {
        return numar_telefon;
    }

    public void setNumar_telefon(String numar_telefon) {
        this.numar_telefon = numar_telefon;
    }

    public String getAdresa_email() {
        return adresa_email;
    }

    public void setAdresa_email(String adresa_email) {
        this.adresa_email = adresa_email;
    }

    public int getNumar_evenimente_create() {
        return numar_evenimente_create;
    }

    public void setNumar_evenimente_create(int numar_evenimente_create) {
        this.numar_evenimente_create = numar_evenimente_create;
    }

    public User(){

    }

    public User(int id_utilizator, String nume, String prenume, int id_nivel_acces, String numar_telefon, String adresa_email, int numar_evenimente_create) {
        this.id_utilizator = id_utilizator;
        this.nume = nume;
        this.prenume = prenume;
        this.id_nivel_acces = id_nivel_acces;
        this.numar_telefon = numar_telefon;
        this.adresa_email = adresa_email;
        this.numar_evenimente_create = numar_evenimente_create;
    }
}
