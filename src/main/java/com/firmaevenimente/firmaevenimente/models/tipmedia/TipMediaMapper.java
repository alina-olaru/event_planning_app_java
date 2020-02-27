package com.firmaevenimente.firmaevenimente.models.tipmedia;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class TipMediaMapper implements RowMapper<TipMedia> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public TipMedia mapRow(ResultSet resultSet, int i) throws SQLException {
        TipMedia tipMedia = new TipMedia();
        tipMedia.setId_tip_media(resultSet.getInt("id_tip_media"));
        tipMedia.setNume_media(resultSet.getString("nume_media"));

        if(resultSet.getBlob("imagine_tip_media") == null)
            tipMedia.setImagine_tip_media(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_tip_media");
            tipMedia.setImagine_tip_media(Base64.getEncoder().encodeToString(bytes));
        }
        return tipMedia;
    }
}