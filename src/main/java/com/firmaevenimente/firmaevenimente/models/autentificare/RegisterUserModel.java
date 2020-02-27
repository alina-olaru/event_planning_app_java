package com.firmaevenimente.firmaevenimente.models.autentificare;

public class RegisterUserModel {
    public String nume;
    public String prenume;
    public String numar_telefon;
    public String adresa_mail;
    public String username;
    public String parola;

    public RegisterUserModel(String nume, String prenume, String numar_telefon, String adresa_mail, String username, String parola) {
        this.nume = nume;
        this.prenume = prenume;
        this.numar_telefon = numar_telefon;
        this.adresa_mail = adresa_mail;
        this.username = username;
        this.parola = parola;
    }
}
