package com.firmaevenimente.firmaevenimente.models.tipmomentartistic;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class TipMomentArtisticMapper implements RowMapper<TipMomentArtistic> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public TipMomentArtistic mapRow(ResultSet resultSet, int i) throws SQLException {
        TipMomentArtistic tipMomentArtistic = new TipMomentArtistic();
        tipMomentArtistic.setId_tip_moment(resultSet.getInt("id_tip_moment"));
        tipMomentArtistic.setNume_categorie_moment_artistic(resultSet.getString("nume_categorie_moment_artistic"));

        if(resultSet.getBlob("imagine_tip_moment_artistic") == null)
            tipMomentArtistic.setImagine_tip_moment_artistic(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_tip_moment_artistic");
            tipMomentArtistic.setImagine_tip_moment_artistic(Base64.getEncoder().encodeToString(bytes));
        }
        return tipMomentArtistic;
    }
}