package com.firmaevenimente.firmaevenimente.models.elementedesign;

import com.firmaevenimente.firmaevenimente.models.bautura.Bautura;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class ElementeDesignMapper implements RowMapper<ElementeDesign> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public ElementeDesign mapRow(ResultSet resultSet, int i) throws SQLException {
        ElementeDesign elementeDesign = new ElementeDesign();
        elementeDesign.setId_element_design(resultSet.getInt("id_element_design"));
        elementeDesign.setNume_element(resultSet.getString("nume_element"));
        elementeDesign.setCuloare(resultSet.getString("culoare"));
        elementeDesign.setCantitate(resultSet.getFloat("cantitate"));
        elementeDesign.setDimensiuni(resultSet.getString("dimensiuni"));
        elementeDesign.setPret_per_element(resultSet.getFloat("pret_per_element"));
        elementeDesign.setDiscount(resultSet.getFloat("discount"));
        elementeDesign.setNumar_minim_elemente_pentru_reducere(resultSet.getInt("numar_minim_elemente_pentru_reducere"));
        if(resultSet.getBlob("imagine_element_design") == null)
            elementeDesign.setImagine_element_design(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_element_design");
            elementeDesign.setImagine_element_design(Base64.getEncoder().encodeToString(bytes));
        }
        return elementeDesign;
    }
}

