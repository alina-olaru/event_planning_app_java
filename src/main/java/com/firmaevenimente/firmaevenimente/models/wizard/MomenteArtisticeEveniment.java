package com.firmaevenimente.firmaevenimente.models.wizard;

import java.util.Date;

public class MomenteArtisticeEveniment {
    int id_moment_artistic;
    float cost;
    Date ora_inceput;
    Date ora_sfarsit;

    public MomenteArtisticeEveniment() {
    }

    public MomenteArtisticeEveniment(int id_moment_artistic, float cost, Date ora_inceput, Date ora_sfarsit) {
        this.id_moment_artistic = id_moment_artistic;
        this.cost = cost;
        this.ora_inceput = ora_inceput;
        this.ora_sfarsit = ora_sfarsit;
    }

    public int getId_moment_artistic() {
        return id_moment_artistic;
    }

    public void setId_moment_artistic(int id_moment_artistic) {
        this.id_moment_artistic = id_moment_artistic;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public Date getOra_inceput() {
        return ora_inceput;
    }

    public void setOra_inceput(Date ora_inceput) {
        this.ora_inceput = ora_inceput;
    }

    public Date getOra_sfarsit() {
        return ora_sfarsit;
    }

    public void setOra_sfarsit(Date ora_sfarsit) {
        this.ora_sfarsit = ora_sfarsit;
    }
}
