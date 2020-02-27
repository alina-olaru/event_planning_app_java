package com.firmaevenimente.firmaevenimente.models.tipmeniu;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;


public class TipMeniuMapper implements RowMapper<TipMeniu> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public TipMeniu mapRow(ResultSet resultSet, int i) throws SQLException {
        TipMeniu tipMeniu = new TipMeniu();
        tipMeniu.setId_tip_meniu(resultSet.getInt("id_tip_meniu"));
        tipMeniu.setId_tip_servire_meniu(resultSet.getInt("id_tip_servire_meniu"));
        tipMeniu.setNume_meniu(resultSet.getString("nume_meniu"));
        tipMeniu.setDenumire_tip_servire(resultSet.getString("denumire_tip_servire"));
        tipMeniu.setClienti_targetati(resultSet.getString("clienti_targetati"));
        tipMeniu.setReducere(resultSet.getFloat("reducere"));
        tipMeniu.setMinim_portii_pentru_reducere(resultSet.getInt("minim_portii_pentru_reducere"));
        tipMeniu.setCost_tip_meniu(resultSet.getFloat("cost_tip_meniu"));

        if(resultSet.getBlob("imagine_meniu") == null)
            tipMeniu.setImagine_meniu(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_meniu");
            tipMeniu.setImagine_meniu(Base64.getEncoder().encodeToString(bytes));
        }
        return tipMeniu;
    }
}