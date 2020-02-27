package com.firmaevenimente.firmaevenimente.models.media;

public class Media {
    int id_media;
    int id_tip_media;
    String denumire;
    String nume_media;
    float pret;
    String descriere;
    String imagine_media;

    public Media() {
    }

    public Media(int id_media, int id_tip_media, String denumire, String nume_media, float pret, String descriere, String imagine_media) {
        this.id_media = id_media;
        this.id_tip_media = id_tip_media;
        this.denumire = denumire;
        this.nume_media = nume_media;
        this.pret = pret;
        this.descriere = descriere;
        this.imagine_media = imagine_media;
    }

    public int getId_media() {
        return id_media;
    }

    public void setId_media(int id_media) {
        this.id_media = id_media;
    }

    public int getId_tip_media() {
        return id_tip_media;
    }

    public void setId_tip_media(int id_tip_media) {
        this.id_tip_media = id_tip_media;
    }

    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public String getNume_media() {
        return nume_media;
    }

    public void setNume_media(String nume_media) {
        this.nume_media = nume_media;
    }

    public float getPret() {
        return pret;
    }

    public void setPret(float pret) {
        this.pret = pret;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getImagine_media() {
        return imagine_media;
    }

    public void setImagine_media(String imagine_media) {
        this.imagine_media = imagine_media;
    }
}
