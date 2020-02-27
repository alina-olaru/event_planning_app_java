package com.firmaevenimente.firmaevenimente.models.tipmedia;

public class TipMedia {
    int id_tip_media;
    String nume_media;
    String imagine_tip_media;

    public TipMedia() {
    }

    public TipMedia(int id_tip_media, String nume_media, String imagine_tip_media) {
        this.id_tip_media = id_tip_media;
        this.nume_media = nume_media;
        this.imagine_tip_media = imagine_tip_media;
    }

    public int getId_tip_media() {
        return id_tip_media;
    }

    public void setId_tip_media(int id_tip_media) {
        this.id_tip_media = id_tip_media;
    }

    public String getNume_media() {
        return nume_media;
    }

    public void setNume_media(String nume_media) {
        this.nume_media = nume_media;
    }

    public String getImagine_tip_media() {
        return imagine_tip_media;
    }

    public void setImagine_tip_media(String imagine_tip_media) {
        this.imagine_tip_media = imagine_tip_media;
    }
}
