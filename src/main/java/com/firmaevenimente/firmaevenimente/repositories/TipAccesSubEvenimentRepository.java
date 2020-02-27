package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tipaccessubeveniment.TipAccesSubEveniment;
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
public class TipAccesSubEvenimentRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipAccesSubEveniment> GetTipAccesSubEveniment(){

        return (List<TipAccesSubEveniment>) namedParameterJdbcTemplate.query(
                "select a.id_sub_eveniment,  " +
                        "       a.id_acces,  " +
                        "       b.nume_categorie_sub_eveniment,  " +
                        "       c.modalitate_acces  " +
                        "from tip_acces_sub_eveniment a  " +
                        "join sub_tip_eveniment b on a.id_sub_eveniment = b.id_sub_eveniment  " +
                        "join tip_acces c on a.id_acces = c.id_acces",
                new BeanPropertyRowMapper<TipAccesSubEveniment>(TipAccesSubEveniment.class)
        );

    }

    public boolean DeleteTipAccesSubEveniment(int id_sub_eveniment, int id_acces){
        return namedParameterJdbcTemplate.update(
                "delete from tip_acces_sub_eveniment where id_sub_eveniment=:id_sub_eveniment and id_acces = :id_acces",
                new MapSqlParameterSource()
                        .addValue("id_sub_eveniment", id_sub_eveniment)
                        .addValue("id_acces", id_acces)
        ) == 1;
    }

    public TipAccesSubEveniment AddTipAccesSubEveniment(TipAccesSubEveniment tipAccesSubEveniment) {
        String insertSql = "insert into tip_acces_sub_eveniment(id_sub_eveniment,id_acces) values (:id_sub_eveniment,:id_acces)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_sub_eveniment", tipAccesSubEveniment.getId_sub_eveniment())
                .addValue("id_acces", tipAccesSubEveniment.getId_acces());

        int affected = namedParameterJdbcTemplate.update(insertSql, parameters);

        if(affected>0){
            return  tipAccesSubEveniment;
        }
        return null;

    }

}

