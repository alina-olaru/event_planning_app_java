package com.firmaevenimente.firmaevenimente.models.bautura;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import java.io.InputStream;
import java.io.ObjectInputStream;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class BauturaMapper implements RowMapper<Bautura> {

    LobHandler blobHandler = new DefaultLobHandler();

    @Override
    public Bautura mapRow(ResultSet resultSet, int i) throws SQLException {
        Bautura bautura = new Bautura();
        bautura.setId_bautura(resultSet.getInt("id_bautura"));
        bautura.setPret_pret_bucata(resultSet.getFloat("pret_pret_bucata"));
        bautura.setPret_per_bax(resultSet.getFloat("pret_per_bax"));
        bautura.setNume_bautura(resultSet.getString("nume_bautura"));
        bautura.setGramaj(resultSet.getFloat("gramaj"));
        if(resultSet.getBlob("imagine_bautura") == null)
            bautura.setImagine_bautura(null);
        else {
            byte[] bytes = blobHandler.getBlobAsBytes(resultSet, "imagine_bautura");
            bautura.setImagine_bautura(Base64.getEncoder().encodeToString(bytes));
        }
        return bautura;
    }
}
