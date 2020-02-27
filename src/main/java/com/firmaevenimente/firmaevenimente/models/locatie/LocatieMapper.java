package com.firmaevenimente.firmaevenimente.models.locatie;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class LocatieMapper implements RowMapper<Locatie> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public Locatie mapRow(ResultSet resultSet, int i) throws SQLException {
        Locatie locatie = new Locatie();
        locatie.setId_locatie(resultSet.getInt("id_locatie"));
        locatie.setId_sub_locatie(resultSet.getInt("id_sub_locatie"));
        locatie.setNume_locatie(resultSet.getString("nume_locatie"));
        locatie.setNume_categorie_tip_locatie(resultSet.getString("nume_categorie_tip_locatie"));
        locatie.setTara(resultSet.getString("tara"));
        locatie.setOras(resultSet.getString("oras"));
        locatie.setAdresa(resultSet.getString("adresa"));
        locatie.setStrada(resultSet.getString("strada"));
        locatie.setDimensiune_mp(resultSet.getFloat("dimensiune_mp"));
        locatie.setCapacitate_maxima(resultSet.getInt("capacitate_maxima"));
        locatie.setPret_inchiriere_per_24h(resultSet.getFloat("pret_inchiriere_per_24h"));
        if(resultSet.getBlob("imagine_locatie") == null)
            locatie.setImagine_locatie(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_locatie");
            locatie.setImagine_locatie(Base64.getEncoder().encodeToString(bytes));
        }
        return locatie;
    }
}