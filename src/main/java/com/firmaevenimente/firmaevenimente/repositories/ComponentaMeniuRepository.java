package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.componentameniu.ComponentaMeniu;
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
public class ComponentaMeniuRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<ComponentaMeniu> GetComponentaMeniu(){

        String sql = "select a.id_preparat, " +
                "       a.id_tip_meniu, " +
                "       a.nume_preparat, " +
                "       b.nume_meniu, " +
                "       a.cantitate, " +
                "       a.alergeni " +
                "from componenta_meniu a " +
                "join tip_meniu b on a.id_tip_meniu = b.id_tip_meniu";
        return (List<ComponentaMeniu>) namedParameterJdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<ComponentaMeniu>(ComponentaMeniu.class)
        );

    }

    public boolean DeleteComponentaMeniu(int id){
        return namedParameterJdbcTemplate.update(
                "delete from componenta_meniu where id_preparat=:id_preparat",
                new MapSqlParameterSource().addValue("id_preparat", id)
        ) == 1;
    }

    public ComponentaMeniu AddComponentaMeniu(ComponentaMeniu componentaMeniu) {
        String sql = "insert into componenta_meniu " +
                "(id_tip_meniu,nume_preparat, " +
                "cantitate,alergeni) " +
                "values(:id_tip_meniu , :nume_preparat , :cantitate , :alergeni)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_meniu", componentaMeniu.getId_tip_meniu())
                .addValue("nume_preparat", componentaMeniu.getNume_preparat())
                .addValue("cantitate", componentaMeniu.getCantitate())
                .addValue("alergeni", componentaMeniu.getAlergeni());

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_preparat" });

        if(holder.getKey().intValue()>0){
            componentaMeniu.setId_preparat(holder.getKey().intValue());
        }else
        {
            componentaMeniu.setId_preparat(-1);
        }
        return componentaMeniu;
    }

    public ComponentaMeniu UpdateComponentaMeniu(ComponentaMeniu componentaMeniu, int id){
        String sql = "update componenta_meniu" +
                " set id_tip_meniu = :id_tip_meniu," +
                " nume_preparat = :nume_preparat," +
                " cantitate = :cantitate," +
                " alergeni = :alergeni" +
                " where id_preparat = :id_preparat";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_meniu", componentaMeniu.getId_tip_meniu())
                .addValue("nume_preparat", componentaMeniu.getNume_preparat())
                .addValue("cantitate", componentaMeniu.getCantitate())
                .addValue("alergeni", componentaMeniu.getAlergeni())
                .addValue("id_preparat", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return componentaMeniu;

        return null;
    }
}