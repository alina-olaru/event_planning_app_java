package com.firmaevenimente.firmaevenimente.models.tiplocatie;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class TipLocatieMapper implements RowMapper<TipLocatie> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public TipLocatie mapRow(ResultSet resultSet, int i) throws SQLException {
        TipLocatie tipLocatie = new TipLocatie();
        tipLocatie.setId_tip_locatie(resultSet.getInt("id_tip_locatie"));
        tipLocatie.setNume_categorie_locatie(resultSet.getString("nume_categorie_locatie"));
        tipLocatie.setDescriere(resultSet.getString("descriere"));

        if(resultSet.getBlob("imagine_tip_locatie") == null)
            tipLocatie.setImagine_tip_locatie(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_tip_locatie");
            tipLocatie.setImagine_tip_locatie(Base64.getEncoder().encodeToString(bytes));
        }
        return tipLocatie;
    }
}