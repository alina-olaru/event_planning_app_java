package com.firmaevenimente.firmaevenimente.models.tipmomentartistic;

public class TipMomentArtistic {
    int id_tip_moment;
    String nume_categorie_moment_artistic;
    String imagine_tip_moment_artistic;

    public TipMomentArtistic() {
    }

    public TipMomentArtistic(int id_tip_moment, String nume_categorie_moment_artistic, String imagine_tip_moment_artistic) {
        this.id_tip_moment = id_tip_moment;
        this.nume_categorie_moment_artistic = nume_categorie_moment_artistic;
        this.imagine_tip_moment_artistic = imagine_tip_moment_artistic;
    }

    public int getId_tip_moment() {
        return id_tip_moment;
    }

    public void setId_tip_moment(int id_tip_moment) {
        this.id_tip_moment = id_tip_moment;
    }

    public String getNume_categorie_moment_artistic() {
        return nume_categorie_moment_artistic;
    }

    public void setNume_categorie_moment_artistic(String nume_categorie_moment_artistic) {
        this.nume_categorie_moment_artistic = nume_categorie_moment_artistic;
    }

    public String getImagine_tip_moment_artistic() {
        return imagine_tip_moment_artistic;
    }

    public void setImagine_tip_moment_artistic(String imagine_tip_moment_artistic) {
        this.imagine_tip_moment_artistic = imagine_tip_moment_artistic;
    }
}
