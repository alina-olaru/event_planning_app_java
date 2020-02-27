package com.firmaevenimente.firmaevenimente.models.media;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class MediaMapper implements RowMapper<Media> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public Media mapRow(ResultSet resultSet, int i) throws SQLException {
        Media media = new Media();
        media.setId_media(resultSet.getInt("id_media"));
        media.setId_tip_media(resultSet.getInt("id_tip_media"));
        media.setDenumire(resultSet.getString("denumire"));
        media.setNume_media(resultSet.getString("nume_media"));
        media.setDescriere(resultSet.getString("descriere"));
        media.setPret(resultSet.getFloat("pret"));

        if(resultSet.getBlob("imagine_media") == null)
            media.setImagine_media(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_media");
            media.setImagine_media(Base64.getEncoder().encodeToString(bytes));
        }
        return media;
    }
}