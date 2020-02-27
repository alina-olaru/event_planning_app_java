package com.firmaevenimente.firmaevenimente.models.elementedesign;

public class ElementeDesign {
    int id_element_design;
    String nume_element;
    String culoare;
    float cantitate;
    String dimensiuni;
    float pret_per_element;
    float discount;
    int numar_minim_elemente_pentru_reducere;
    String imagine_element_design;

    public ElementeDesign() {
    }

    public ElementeDesign(int id_element_design, String nume_element, String culoare, float cantitate, String dimensiuni, float pret_per_element, float discount, int numar_minim_elemente_pentru_reducere, String imagine_element_design) {
        this.id_element_design = id_element_design;
        this.nume_element = nume_element;
        this.culoare = culoare;
        this.cantitate = cantitate;
        this.dimensiuni = dimensiuni;
        this.pret_per_element = pret_per_element;
        this.discount = discount;
        this.numar_minim_elemente_pentru_reducere = numar_minim_elemente_pentru_reducere;
        this.imagine_element_design = imagine_element_design;
    }

    public int getId_element_design() {
        return id_element_design;
    }

    public void setId_element_design(int id_element_design) {
        this.id_element_design = id_element_design;
    }

    public String getNume_element() {
        return nume_element;
    }

    public void setNume_element(String nume_element) {
        this.nume_element = nume_element;
    }

    public String getCuloare() {
        return culoare;
    }

    public void setCuloare(String culoare) {
        this.culoare = culoare;
    }

    public float getCantitate() {
        return cantitate;
    }

    public void setCantitate(float cantitate) {
        this.cantitate = cantitate;
    }

    public String getDimensiuni() {
        return dimensiuni;
    }

    public void setDimensiuni(String dimensiuni) {
        this.dimensiuni = dimensiuni;
    }

    public float getPret_per_element() {
        return pret_per_element;
    }

    public void setPret_per_element(float pret_per_element) {
        this.pret_per_element = pret_per_element;
    }

    public float getDiscount() {
        return discount;
    }

    public void setDiscount(float discount) {
        this.discount = discount;
    }

    public int getNumar_minim_elemente_pentru_reducere() {
        return numar_minim_elemente_pentru_reducere;
    }

    public void setNumar_minim_elemente_pentru_reducere(int numar_minim_elemente_pentru_reducere) {
        this.numar_minim_elemente_pentru_reducere = numar_minim_elemente_pentru_reducere;
    }

    public String getImagine_element_design() {
        return imagine_element_design;
    }

    public void setImagine_element_design(String imagine_element_design) {
        this.imagine_element_design = imagine_element_design;
    }
}
