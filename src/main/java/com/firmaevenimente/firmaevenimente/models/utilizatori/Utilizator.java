package com.firmaevenimente.firmaevenimente.models.utilizatori;

public class Utilizator {
    int id_utilizator;
    int id_nivel_acces;
    String nume;
    String prenume;
    String numar_telefon;
    String adresa_mail;
    int numar_evenimente_create;
    String username;
    String parola;
    String rol;
    public Utilizator() {
    }

    public Utilizator(int id_utilizator, int id_nivel_acces, String nume, String prenume, String numar_telefon, String adresa_mail, int numar_evenimente_create, String username, String parola, String rol) {
        this.id_utilizator = id_utilizator;
        this.id_nivel_acces = id_nivel_acces;
        this.nume = nume;
        this.prenume = prenume;
        this.numar_telefon = numar_telefon;
        this.adresa_mail = adresa_mail;
        this.numar_evenimente_create = numar_evenimente_create;
        this.username = username;
        this.parola = parola;
        this.rol = rol;
    }

    public int getId_utilizator() {
        return id_utilizator;
    }

    public void setId_utilizator(int id_utilizator) {
        this.id_utilizator = id_utilizator;
    }

    public int getId_nivel_acces() {
        return id_nivel_acces;
    }

    public void setId_nivel_acces(int id_nivel_acces) {
        this.id_nivel_acces = id_nivel_acces;
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

    public String getNumar_telefon() {
        return numar_telefon;
    }

    public void setNumar_telefon(String numar_telefon) {
        this.numar_telefon = numar_telefon;
    }

    public String getAdresa_mail() {
        return adresa_mail;
    }

    public void setAdresa_mail(String adresa_mail) {
        this.adresa_mail = adresa_mail;
    }

    public int getNumar_evenimente_create() {
        return numar_evenimente_create;
    }

    public void setNumar_evenimente_create(int numar_evenimente_create) {
        this.numar_evenimente_create = numar_evenimente_create;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
