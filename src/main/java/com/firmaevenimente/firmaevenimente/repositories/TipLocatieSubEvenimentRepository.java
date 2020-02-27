package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tiplocatiesubeveniment.TipLocatieSubEveniment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TipLocatieSubEvenimentRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipLocatieSubEveniment> GetTipLocatieSubEveniment(){

        return (List<TipLocatieSubEveniment>) namedParameterJdbcTemplate.query(
                "select a.id_sub_eveniment,  " +
                        "       a.id_tip_locatie,  " +
                        "       b.nume_categorie_sub_eveniment,  " +
                        "       c.nume_categorie_locatie  " +
                        "from tip_locatie_sub_tip_eveniment a  " +
                        "join sub_tip_eveniment b on a.id_sub_eveniment = b.id_sub_eveniment  " +
                        "join tip_locatie c on a.id_tip_locatie = c.id_tip_locatie",
                new BeanPropertyRowMapper<TipLocatieSubEveniment>(TipLocatieSubEveniment.class)
        );

    }

    public boolean DeleteTipLocatieSubEveniment(int id_sub_eveniment, int id_tip_locatie){
        return namedParameterJdbcTemplate.update(
                "delete from tip_locatie_sub_tip_eveniment where id_sub_eveniment=:id_sub_eveniment and id_tip_locatie = :id_tip_locatie",
                new MapSqlParameterSource()
                        .addValue("id_sub_eveniment", id_sub_eveniment)
                        .addValue("id_tip_locatie", id_tip_locatie)
        ) == 1;
    }

    public TipLocatieSubEveniment AddTipLocatieSubEveniment(TipLocatieSubEveniment tipLocatieSubEveniment) {
        String insertSql = "insert into tip_locatie_sub_tip_eveniment(id_sub_eveniment,id_tip_locatie) values (:id_sub_eveniment,:id_tip_locatie)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_sub_eveniment", tipLocatieSubEveniment.getId_sub_eveniment())
                .addValue("id_tip_locatie", tipLocatieSubEveniment.getId_tip_locatie());

        int affected = namedParameterJdbcTemplate.update(insertSql, parameters);

        if(affected>0){
            return  tipLocatieSubEveniment;
        }
        return null;

    }

}