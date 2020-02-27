package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tipmeniu.TipMeniu;
import com.firmaevenimente.firmaevenimente.models.tipmeniu.TipMeniuMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.List;

@Repository
public class TipMeniuRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipMeniu> GetTipMeniu(){

        String sql = " select a.id_tip_meniu, " +
                "       a.id_tip_servire_meniu, " +
                "       a.nume_meniu, " +
                "       b.denumire_tip_servire, " +
                "       a.clienti_targetati, " +
                "       a.reducere, " +
                "       a.minim_portii_pentru_reducere, " +
                "       a.cost_tip_meniu, " +
                "       a.imagine_meniu " +
                "from tip_meniu a " +
                "join tip_servire_meniu b on a.id_tip_servire_meniu = b.id_tip_servire_meniu";
        return (List<TipMeniu>) namedParameterJdbcTemplate.query(
                sql,
                new TipMeniuMapper()
        );

    }

    public boolean DeleteTipMeniu(int id){
        return namedParameterJdbcTemplate.update(
                "delete from tip_meniu where id_tip_meniu=:id_tip_meniu",
                new MapSqlParameterSource().addValue("id_tip_meniu", id)
        ) == 1;
    }

    public TipMeniu AddTipMeniu(TipMeniu tipMeniu) {
        String sql = " insert into tip_meniu " +
                "(id_tip_servire_meniu, " +
                "NUME_MENIU,CLIENTI_TARGETATI,REDUCERE, " +
                "MINIM_PORTII_PENTRU_REDUCERE, " +
                "COST_TIP_MENIU,IMAGINE_MENIU) " +
                "VALUES(:id_tip_servire_meniu , :nume_meniu , :clienti_targetati " +
                " , :reducere , :minim_portii_pentru_reducere , :cost_tip_meniu , :imagine_meniu)";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipMeniu.getImagine_meniu() == null || tipMeniu.getImagine_meniu().isEmpty())){
            bytes = Base64.decodeBase64(tipMeniu.getImagine_meniu());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_servire_meniu", tipMeniu.getId_tip_servire_meniu())
                .addValue("nume_meniu", tipMeniu.getNume_meniu())
                .addValue("clienti_targetati", tipMeniu.getClienti_targetati())
                .addValue("reducere", tipMeniu.getReducere())
                .addValue("minim_portii_pentru_reducere", tipMeniu.getMinim_portii_pentru_reducere())
                .addValue("cost_tip_meniu", tipMeniu.getCost_tip_meniu())
                .addValue("imagine_meniu", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_tip_meniu" });

        if(holder.getKey().intValue()>0){
            tipMeniu.setId_tip_meniu(holder.getKey().intValue());
        }else
        {
            tipMeniu.setId_tip_meniu(-1);
        }
        return tipMeniu;
    }

    public TipMeniu UpdateTipMeniu(TipMeniu tipMeniu, int id){
        String sql = "update tip_meniu " +
                " set   id_tip_servire_meniu = :id_tip_servire_meniu , " +
                "       nume_meniu = :nume_meniu , " +
                "       clienti_targetati = :clienti_targetati , " +
                "       reducere = :reducere, " +
                "       minim_portii_pentru_reducere = :minim_portii_pentru_reducere , " +
                "       cost_tip_meniu = :cost_tip_meniu, " +
                "       imagine_meniu = :imagine_meniu " +
                " where id_tip_meniu = :id_tip_meniu";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipMeniu.getImagine_meniu() == null || tipMeniu.getImagine_meniu().isEmpty())){
            bytes = Base64.decodeBase64(tipMeniu.getImagine_meniu());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_servire_meniu", tipMeniu.getId_tip_servire_meniu())
                .addValue("nume_meniu", tipMeniu.getNume_meniu())
                .addValue("clienti_targetati", tipMeniu.getClienti_targetati())
                .addValue("reducere", tipMeniu.getReducere())
                .addValue("minim_portii_pentru_reducere", tipMeniu.getMinim_portii_pentru_reducere())
                .addValue("cost_tip_meniu", tipMeniu.getCost_tip_meniu())
                .addValue("imagine_meniu", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_tip_meniu", tipMeniu.getId_tip_meniu());

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return tipMeniu;

        return null;
    }
}
