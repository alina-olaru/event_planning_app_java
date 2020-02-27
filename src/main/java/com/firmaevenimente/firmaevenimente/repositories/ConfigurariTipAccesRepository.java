package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.configuraritipacces.ConfigurariTipAcces;
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
public class ConfigurariTipAccesRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<ConfigurariTipAcces> GetConfigurariTipAcces(){

        String sql = "select a.id_configurari_acces, " +
                "       a.id_acces, " +
                "       a.denumire_configurare_acces, " +
                "       b.modalitate_acces, " +
                "       a.cost_realizare " +
                "from configurari_tip_acces a " +
                "join tip_acces b on a.id_acces = b.id_acces";
        return (List<ConfigurariTipAcces>) namedParameterJdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<ConfigurariTipAcces>(ConfigurariTipAcces.class)
        );

    }

    public boolean DeleteConfigurariTipAcces(int id){
        return namedParameterJdbcTemplate.update(
                "delete from configurari_tip_acces where id_configurari_acces=:id_configurari_acces",
                new MapSqlParameterSource().addValue("id_configurari_acces", id)
        ) == 1;
    }

    public ConfigurariTipAcces AddConfigurariTipAcces(ConfigurariTipAcces configurariTipAcces) {
        String sql = "INSERT INTO configurari_tip_acces " +
                "(id_acces,denumire_configurare_acces,cost_realizare) " +
                "VALUES(:id_acces, :denumire_configurare_acces, :cost_realizare)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_acces", configurariTipAcces.getId_acces())
                .addValue("denumire_configurare_acces", configurariTipAcces.getDenumire_configurare_acces())
                .addValue("cost_realizare", configurariTipAcces.getCost_realizare());

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_configurari_acces" });

        if(holder.getKey().intValue()>0){
            configurariTipAcces.setId_configurari_acces(holder.getKey().intValue());
        }else
        {
            configurariTipAcces.setId_configurari_acces(-1);
        }
        return configurariTipAcces;
    }

    public ConfigurariTipAcces UpdateConfigurariTipAcces(ConfigurariTipAcces configurariTipAcces, int id){
        String sql = "update configurari_tip_acces" +
                " set id_acces = :id_acces," +
                " denumire_configurare_acces = :denumire_configurare_acces," +
                " cost_realizare = :cost_realizare " +
                " where id_configurari_acces = :id_configurari_acces";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_acces", configurariTipAcces.getId_acces())
                .addValue("denumire_configurare_acces", configurariTipAcces.getDenumire_configurare_acces())
                .addValue("cost_realizare", configurariTipAcces.getCost_realizare())
                .addValue("id_configurari_acces", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return configurariTipAcces;

        return null;
    }
}
