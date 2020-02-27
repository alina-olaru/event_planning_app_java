package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tiplocatie.TipLocatie;
import com.firmaevenimente.firmaevenimente.models.tiplocatie.TipLocatieMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.List;
import java.util.Map;

@Repository
public class TipLocatieRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipLocatie> GetTipLocatie(){

        String sql = "select id_tip_locatie, " +
                "         nume_categorie_locatie, " +
                "         descriere, " +
                "         imagine_tip_locatie " +
                " from tip_locatie";
        return (List<TipLocatie>) namedParameterJdbcTemplate.query(
                sql,
                new TipLocatieMapper()
        );

    }

    public List<TipLocatie> GetTipLocatieWhere(Map<String, List<String>> wheres){
        String sql = " select * from ( " +
                "select a.id_tip_locatie,  " +
                "       a.nume_categorie_locatie,  " +
                "       a.descriere,  " +
                "       a.imagine_tip_locatie, " +
                "       b.id_sub_eveniment " +
                "from tip_locatie a " +
                "join tip_locatie_sub_tip_eveniment b on a.id_tip_locatie = b.id_tip_locatie) x";
        MapSqlParameterSource parameters = new MapSqlParameterSource();

        if(wheres.size()>0) {
            sql += " where ";

            for(Map.Entry<String, List<String>> e : wheres.entrySet())
            {
                sql +=  String.format("x.%s in (:%s)", e.getKey(), e.getKey());
                parameters.addValue(e.getKey(), e.getValue());
            }

        }
        return (List<TipLocatie>) namedParameterJdbcTemplate.query(
                sql,
                parameters,
                new TipLocatieMapper()
        );
    }

    public boolean DeleteTipLocatie(int id){
        return namedParameterJdbcTemplate.update(
                "delete from tip_locatie where id_tip_locatie=:id_tip_locatie",
                new MapSqlParameterSource().addValue("id_tip_locatie", id)
        ) == 1;
    }

    public TipLocatie AddTipLocatie(TipLocatie tipLocatie) {
        String sql = "INSERT INTO TIP_LOCATIE(NUME_CATEGORIE_LOCATIE,DESCRIERE,IMAGINE_TIP_LOCATIE) " +
                "VALUES(:nume_categorie_locatie, :descriere, :imagine_tip_locatie )";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipLocatie.getImagine_tip_locatie() == null || tipLocatie.getImagine_tip_locatie().isEmpty())){
            bytes = Base64.decodeBase64(tipLocatie.getImagine_tip_locatie());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_categorie_locatie", tipLocatie.getNume_categorie_locatie())
                .addValue("descriere", tipLocatie.getDescriere())
                .addValue("imagine_tip_locatie", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_tip_locatie" });

        if(holder.getKey().intValue()>0){
            tipLocatie.setId_tip_locatie(holder.getKey().intValue());
        }else
        {
            tipLocatie.setId_tip_locatie(-1);
        }
        return tipLocatie;
    }

    public TipLocatie UpdateTipLocatie(TipLocatie tipLocatie, int id){
        String sql = "update TIP_LOCATIE " +
                " set nume_categorie_locatie = :nume_categorie_locatie," +
                "    descriere = :descriere," +
                "    imagine_tip_locatie = :imagine_tip_locatie" +
                " where id_tip_locatie = :id_tip_locatie";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipLocatie.getImagine_tip_locatie() == null || tipLocatie.getImagine_tip_locatie().isEmpty())){
            bytes = Base64.decodeBase64(tipLocatie.getImagine_tip_locatie());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_categorie_locatie", tipLocatie.getNume_categorie_locatie())
                .addValue("descriere", tipLocatie.getDescriere())
                .addValue("imagine_tip_locatie", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_tip_locatie", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return tipLocatie;

        return null;
    }
}
