package com.firmaevenimente.firmaevenimente.models.organizatori;

public class Organizatori {
    int id_organizator;
    String nume;
    String prenume;
    String adresa_mail;
    String numar_contact;
    int numar_evenimente_organizate;

    public Organizatori() {
    }

    public Organizatori(int id_organizator, String nume, String prenume, String adresa_mail, String numar_contact, int numar_evenimente_organizate) {
        this.id_organizator = id_organizator;
        this.nume = nume;
        this.prenume = prenume;
        this.adresa_mail = adresa_mail;
        this.numar_contact = numar_contact;
        this.numar_evenimente_organizate = numar_evenimente_organizate;
    }

    public int getId_organizator() {
        return id_organizator;
    }

    public void setId_organizator(int id_organizator) {
        this.id_organizator = id_organizator;
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

    public String getAdresa_mail() {
        return adresa_mail;
    }

    public void setAdresa_mail(String adresa_mail) {
        this.adresa_mail = adresa_mail;
    }

    public String getNumar_contact() {
        return numar_contact;
    }

    public void setNumar_contact(String numar_contact) {
        this.numar_contact = numar_contact;
    }

    public int getNumar_evenimente_organizate() {
        return numar_evenimente_organizate;
    }

    public void setNumar_evenimente_organizate(int numar_evenimente_organizate) {
        this.numar_evenimente_organizate = numar_evenimente_organizate;
    }
}
