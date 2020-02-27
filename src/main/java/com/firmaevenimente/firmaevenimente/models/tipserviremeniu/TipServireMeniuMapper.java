package com.firmaevenimente.firmaevenimente.models.tipserviremeniu;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class TipServireMeniuMapper implements RowMapper<TipServireMeniu> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public TipServireMeniu mapRow(ResultSet resultSet, int i) throws SQLException {
        TipServireMeniu tipServireMeniu = new TipServireMeniu();
        tipServireMeniu.setId_tip_servire_meniu(resultSet.getInt("id_tip_servire_meniu"));
        tipServireMeniu.setDenumire_tip_servire(resultSet.getString("denumire_tip_servire"));

        if(resultSet.getBlob("imagine_tip_servire") == null)
            tipServireMeniu.setImagine_tip_servire(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_tip_servire");
            tipServireMeniu.setImagine_tip_servire(Base64.getEncoder().encodeToString(bytes));
        }
        return tipServireMeniu;
    }
}