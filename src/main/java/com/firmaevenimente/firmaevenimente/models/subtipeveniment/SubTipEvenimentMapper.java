package com.firmaevenimente.firmaevenimente.models.subtipeveniment;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;


public class SubTipEvenimentMapper implements RowMapper<SubTipEveniment> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public SubTipEveniment mapRow(ResultSet resultSet, int i) throws SQLException {
        SubTipEveniment subTipEveniment = new SubTipEveniment();
        subTipEveniment.setId_sub_eveniment(resultSet.getInt("id_sub_eveniment"));
        subTipEveniment.setId_tip_eveniment(resultSet.getInt("id_tip_eveniment"));
        subTipEveniment.setNume_categorie_sub_eveniment(resultSet.getString("nume_categorie_sub_eveniment"));
        subTipEveniment.setNume_categorie_eveniment(resultSet.getString("nume_categorie_eveniment"));
        subTipEveniment.setNumar_evenimente_organizate_per_sub_eveniment(resultSet.getInt("numar_evenimente_organizate_per_sub_eveniment"));
        subTipEveniment.setDescriere(resultSet.getString("descriere"));

        if(resultSet.getBlob("imagine_sub_eveniment") == null)
            subTipEveniment.setImagine_sub_eveniment(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_sub_eveniment");
            subTipEveniment.setImagine_sub_eveniment(Base64.getEncoder().encodeToString(bytes));
        }
        return subTipEveniment;
    }
}