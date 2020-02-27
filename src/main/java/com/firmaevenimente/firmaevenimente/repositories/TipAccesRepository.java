package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.locatie.Locatie;
import com.firmaevenimente.firmaevenimente.models.locatie.LocatieMapper;
import com.firmaevenimente.firmaevenimente.models.tipacces.TipAcces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class TipAccesRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipAcces> GetTipAcces(){

        return (List<TipAcces>) namedParameterJdbcTemplate.query(
                "select ID_ACCES, MODALITATE_ACCES from TIP_ACCES",
                new BeanPropertyRowMapper<TipAcces>(TipAcces.class)
        );

    }

    public List<TipAcces> GetTipAccesWhere(Map<String, List<String>> wheres){
        String sql = "select * from ( select a.id_acces, " +
                "       a.modalitate_acces, " +
                "       b.id_sub_eveniment " +
                "from tip_acces a " +
                "join tip_acces_sub_eveniment b on a.id_acces = b.id_acces) x ";
        MapSqlParameterSource parameters = new MapSqlParameterSource();

        if(wheres.size()>0) {
            sql += " where ";

            for(Map.Entry<String, List<String>> e : wheres.entrySet())
            {
                sql +=  String.format("x.%s in (:%s)", e.getKey(), e.getKey());
                parameters.addValue(e.getKey(), e.getValue());
            }

        }
        return (List<TipAcces>) namedParameterJdbcTemplate.query(
                sql,
                parameters,
                new BeanPropertyRowMapper<TipAcces>(TipAcces.class)
        );
    }

    public boolean DeleteTipAcces(int id){
        return namedParameterJdbcTemplate.update(
                "delete from TIP_ACCES where ID_ACCES=:id_acces",
                new MapSqlParameterSource().addValue("id_acces", id)
        ) == 1;
    }

    public TipAcces AddTipAcces(TipAcces tipAcces) {
        String insertSql = "insert into TIP_ACCES(MODALITATE_ACCES) values (:modalitate_acces)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("modalitate_acces", tipAcces.getModalitate_acces());

        namedParameterJdbcTemplate.update(insertSql, parameters, holder, new String[] { "ID_ACCES" });

        if(holder.getKey().intValue()>0){
            tipAcces.setId_acces(holder.getKey().intValue());
        }else
        {
            tipAcces.setId_acces(-1);
        }
        return tipAcces;

    }

}
