package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tiputilizatori.TipUtilizator;
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
public class TipUtilizatoriRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipUtilizator> GetTipUtilizatori(){

        return (List<TipUtilizator>) namedParameterJdbcTemplate.query(
                "select ID_NIVEL_ACCES, ROL from TIP_UTILIZATORI",
                new BeanPropertyRowMapper<TipUtilizator>(TipUtilizator.class)
        );

    }

    public boolean DeleteTipUtilizator(int id){
        return namedParameterJdbcTemplate.update(
                "delete from TIP_UTILIZATORI where ID_NIVEL_ACCES=:nivel_acces",
                new MapSqlParameterSource().addValue("nivel_acces", id)
        ) == 1;
    }

    public TipUtilizator AddTipUtilizator(TipUtilizator tipUtilizator) {
        String insertSql = "insert into TIP_UTILIZATORI(ROL) values (:tip_utilizator)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("tip_utilizator", tipUtilizator.getRol());

        namedParameterJdbcTemplate.update(insertSql, parameters, holder, new String[] { "ID_NIVEL_ACCES" });

        if(holder.getKey().intValue()>0){
            tipUtilizator.setId_nivel_acces(holder.getKey().intValue());
        }else
        {
            tipUtilizator.setId_nivel_acces(-1);
        }
        return tipUtilizator;

    }

}
