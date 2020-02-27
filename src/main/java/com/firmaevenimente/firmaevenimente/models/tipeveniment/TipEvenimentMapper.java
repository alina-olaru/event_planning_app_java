package com.firmaevenimente.firmaevenimente.models.tipeveniment;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class TipEvenimentMapper implements RowMapper<TipEveniment> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public TipEveniment mapRow(ResultSet resultSet, int i) throws SQLException {
        TipEveniment tipServireMeniu = new TipEveniment();
        tipServireMeniu.setId_tip_eveniment(resultSet.getInt("id_tip_eveniment"));
        tipServireMeniu.setNume_categorie_eveniment(resultSet.getString("nume_categorie_eveniment"));
        tipServireMeniu.setNumar_evenimente_organizate_per_categorie(resultSet.getInt("numar_evenimente_organizate_per_categorie"));

        if(resultSet.getBlob("imagine_tip_eveniment") == null)
            tipServireMeniu.setImagine_tip_eveniment(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_tip_eveniment");
            tipServireMeniu.setImagine_tip_eveniment(Base64.getEncoder().encodeToString(bytes));
        }
        return tipServireMeniu;
    }
}