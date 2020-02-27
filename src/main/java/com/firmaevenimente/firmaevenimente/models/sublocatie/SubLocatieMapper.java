package com.firmaevenimente.firmaevenimente.models.sublocatie;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;


public class SubLocatieMapper implements RowMapper<SubLocatie> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public SubLocatie mapRow(ResultSet resultSet, int i) throws SQLException {
        SubLocatie subLocatie = new SubLocatie();
        subLocatie.setId_sub_locatie(resultSet.getInt("id_sub_locatie"));
        subLocatie.setId_tip_locatie(resultSet.getInt("id_tip_locatie"));
        subLocatie.setNume_categorie_tip_locatie(resultSet.getString("nume_categorie_tip_locatie"));
        subLocatie.setNume_tip_locatie(resultSet.getString("nume_tip_locatie"));
        subLocatie.setAnotimp_potrivit(resultSet.getString("anotimp_potrivit"));

        if(resultSet.getBlob("imagine_sub_locatie") == null)
            subLocatie.setImagine_sub_locatie(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_sub_locatie");
            subLocatie.setImagine_sub_locatie(Base64.getEncoder().encodeToString(bytes));
        }
        return subLocatie;
    }
}
