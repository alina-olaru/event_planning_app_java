package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.sublocatie.SubLocatie;
import com.firmaevenimente.firmaevenimente.models.sublocatie.SubLocatieMapper;
import com.firmaevenimente.firmaevenimente.models.subtipeveniment.SubTipEveniment;
import com.firmaevenimente.firmaevenimente.models.subtipeveniment.SubTipEvenimentMapper;
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
public class SubLocatieRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<SubLocatie> GetSubLocatie(){

        String sql = " select a.id_sub_locatie, " +
                "        a.id_tip_locatie, " +
                "        a.nume_categorie_tip_locatie, " +
                "        a.anotimp_potrivit, " +
                "        b.nume_categorie_locatie as nume_tip_locatie, " +
                "        a.imagine_sub_locatie " +
                " from sub_locatie a " +
                " join tip_locatie b on a.id_tip_locatie = b.id_tip_locatie";
        return (List<SubLocatie>) namedParameterJdbcTemplate.query(
                sql,
                new SubLocatieMapper()
        );

    }

    public List<SubLocatie> GetSubLocatieWhere(Map<String, List<String>> wheres){
        String sql = " select a.id_sub_locatie, " +
                "        a.id_tip_locatie, " +
                "        a.nume_categorie_tip_locatie, " +
                "        a.anotimp_potrivit, " +
                "        b.nume_categorie_locatie as nume_tip_locatie, " +
                "        a.imagine_sub_locatie " +
                " from sub_locatie a " +
                " join tip_locatie b on a.id_tip_locatie = b.id_tip_locatie ";
        MapSqlParameterSource parameters = new MapSqlParameterSource();

        if(wheres.size()>0) {
            sql += " where ";

            for(Map.Entry<String, List<String>> e : wheres.entrySet())
            {
                sql +=  String.format("a.%s in (:%s)", e.getKey(), e.getKey());
                parameters.addValue(e.getKey(), e.getValue());
            }

        }
        return (List<SubLocatie>) namedParameterJdbcTemplate.query(
                sql,
                parameters,
                new SubLocatieMapper()
        );
    }

    public boolean DeleteSubLocatie(int id){
        return namedParameterJdbcTemplate.update(
                "delete from sub_locatie where id_sub_locatie=:id_sub_locatie",
                new MapSqlParameterSource().addValue("id_sub_locatie", id)
        ) == 1;
    }

    public SubLocatie AddSubLocatie(SubLocatie subLocatie) {
        String sql = " INSERT INTO SUB_LOCATIE " +
                " (ID_TIP_LOCATIE,NUME_CATEGORIE_TIP_LOCATIE, " +
                " ANOTIMP_POTRIVIT,IMAGINE_SUB_LOCATIE) " +
                " VALUES (:id_tip_locatie, :nume_categorie_tip_locatie, :anotimp_potrivit, :imagine_sub_locatie)";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(subLocatie.getImagine_sub_locatie() == null || subLocatie.getImagine_sub_locatie().isEmpty())){
            bytes = Base64.decodeBase64(subLocatie.getImagine_sub_locatie());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_locatie", subLocatie.getId_tip_locatie())
                .addValue("nume_categorie_tip_locatie", subLocatie.getNume_categorie_tip_locatie())
                .addValue("anotimp_potrivit", subLocatie.getAnotimp_potrivit())
                .addValue("imagine_sub_locatie", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_sub_locatie" });

        if(holder.getKey().intValue()>0){
            subLocatie.setId_sub_locatie(holder.getKey().intValue());
        }else
        {
            subLocatie.setId_tip_locatie(-1);
        }
        return subLocatie;
    }

    public SubLocatie UpdateSubLocatie(SubLocatie subLocatie, int id){
        String sql = "update sub_locatie " +
                " set id_tip_locatie = :id_tip_locatie, " +
                "     nume_categorie_tip_locatie = :nume_categorie_tip_locatie, " +
                "     anotimp_potrivit = :anotimp_potrivit, " +
                "     imagine_sub_locatie = :imagine_sub_locatie " +
                " where id_sub_locatie = :id_sub_locatie";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(subLocatie.getImagine_sub_locatie() == null || subLocatie.getImagine_sub_locatie().isEmpty())){
            bytes = Base64.decodeBase64(subLocatie.getImagine_sub_locatie());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_locatie", subLocatie.getId_tip_locatie())
                .addValue("nume_categorie_tip_locatie", subLocatie.getNume_categorie_tip_locatie())
                .addValue("anotimp_potrivit", subLocatie.getAnotimp_potrivit())
                .addValue("imagine_sub_locatie", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_sub_locatie", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return subLocatie;

        return null;
    }
}
