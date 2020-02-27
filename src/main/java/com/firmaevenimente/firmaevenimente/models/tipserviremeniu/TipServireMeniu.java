package com.firmaevenimente.firmaevenimente.models.tipserviremeniu;

public class TipServireMeniu {
    int id_tip_servire_meniu;
    String denumire_tip_servire;
    String imagine_tip_servire;

    public TipServireMeniu() {
    }

    public TipServireMeniu(int id_tip_servire_meniu, String denumire_tip_servire, String imagine_tip_servire) {
        this.id_tip_servire_meniu = id_tip_servire_meniu;
        this.denumire_tip_servire = denumire_tip_servire;
        this.imagine_tip_servire = imagine_tip_servire;
    }

    public int getId_tip_servire_meniu() {
        return id_tip_servire_meniu;
    }

    public void setId_tip_servire_meniu(int id_tip_servire_meniu) {
        this.id_tip_servire_meniu = id_tip_servire_meniu;
    }

    public String getDenumire_tip_servire() {
        return denumire_tip_servire;
    }

    public void setDenumire_tip_servire(String denumire_tip_servire) {
        this.denumire_tip_servire = denumire_tip_servire;
    }

    public String getImagine_tip_servire() {
        return imagine_tip_servire;
    }

    public void setImagine_tip_servire(String imagine_tip_servire) {
        this.imagine_tip_servire = imagine_tip_servire;
    }
}
