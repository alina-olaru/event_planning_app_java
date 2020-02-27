package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tipeveniment.TipEveniment;
import com.firmaevenimente.firmaevenimente.models.tipeveniment.TipEvenimentMapper;
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
public class TipEvenimentRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipEveniment> GetTipEveniment(){

        String sql = "select id_tip_eveniment, " +
                "         nume_categorie_eveniment, " +
                "         numar_evenimente_organizate_per_categorie, " +
                "         imagine_tip_eveniment " +
                " from tip_eveniment ";
        return (List<TipEveniment>) namedParameterJdbcTemplate.query(
                sql,
                new TipEvenimentMapper()
        );

    }

    public boolean DeleteTipEveniment(int id){
        return namedParameterJdbcTemplate.update(
                "delete from tip_eveniment where id_tip_eveniment=:id_tip_eveniment",
                new MapSqlParameterSource().addValue("id_tip_eveniment", id)
        ) == 1;
    }

    public TipEveniment AddTipEveniment(TipEveniment tipEveniment) {
        String sql = "INSERT INTO tip_eveniment(nume_categorie_eveniment,imagine_tip_eveniment) " +
                "VALUES(:nume_categorie_eveniment, :imagine_tip_eveniment )";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipEveniment.getImagine_tip_eveniment() == null || tipEveniment.getImagine_tip_eveniment().isEmpty())){
            bytes = Base64.decodeBase64(tipEveniment.getImagine_tip_eveniment());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_categorie_eveniment", tipEveniment.getNume_categorie_eveniment())
                .addValue("imagine_tip_eveniment", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_tip_eveniment" });

        if(holder.getKey().intValue()>0){
            tipEveniment.setId_tip_eveniment(holder.getKey().intValue());
        }else
        {
            tipEveniment.setId_tip_eveniment(-1);
        }
        return tipEveniment;
    }

    public TipEveniment UpdateTipEveniment(TipEveniment tipEveniment, int id){
        String sql = "update tip_eveniment " +
                " set nume_categorie_eveniment = :nume_categorie_eveniment," +
                "    imagine_tip_eveniment = :imagine_tip_eveniment" +
                " where id_tip_eveniment = :id_tip_eveniment";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipEveniment.getImagine_tip_eveniment() == null || tipEveniment.getImagine_tip_eveniment().isEmpty())){
            bytes = Base64.decodeBase64(tipEveniment.getImagine_tip_eveniment());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_categorie_eveniment", tipEveniment.getNume_categorie_eveniment())
                .addValue("imagine_tip_eveniment", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_tip_eveniment", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return tipEveniment;

        return null;
    }
}
