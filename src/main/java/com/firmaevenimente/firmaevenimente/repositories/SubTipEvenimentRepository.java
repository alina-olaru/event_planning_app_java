package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.subtipeveniment.SubTipEveniment;
import com.firmaevenimente.firmaevenimente.models.subtipeveniment.SubTipEvenimentMapper;
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
import java.util.Dictionary;
import java.util.List;
import java.util.Map;

@Repository
public class SubTipEvenimentRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<SubTipEveniment> GetSubTipEveniment(){

        String sql = " select a.id_sub_eveniment, " +
                "        a.id_tip_eveniment, " +
                "        a.nume_categorie_sub_eveniment, " +
                "        b.nume_categorie_eveniment, " +
                "        a.numar_evenimente_organizate_per_sub_eveniment, " +
                "        a.descriere, " +
                "        a.imagine_sub_eveniment " +
                " from sub_tip_eveniment a " +
                " join tip_eveniment b on a.id_tip_eveniment = b.id_tip_eveniment";
        return (List<SubTipEveniment>) namedParameterJdbcTemplate.query(
                sql,
                new SubTipEvenimentMapper()
        );

    }

    public List<SubTipEveniment> GetSubTipEvenimentWhere(Map<String, List<String>> wheres){
        String sql = " select a.id_sub_eveniment, " +
                "        a.id_tip_eveniment, " +
                "        a.nume_categorie_sub_eveniment, " +
                "        b.nume_categorie_eveniment, " +
                "        a.numar_evenimente_organizate_per_sub_eveniment, " +
                "        a.descriere, " +
                "        a.imagine_sub_eveniment " +
                " from sub_tip_eveniment a " +
                " join tip_eveniment b on a.id_tip_eveniment = b.id_tip_eveniment";
        MapSqlParameterSource parameters = new MapSqlParameterSource();

        if(wheres.size()>0) {
            sql += " where ";

            for(Map.Entry<String, List<String>> e : wheres.entrySet())
            {
                sql +=  String.format("a.%s in (:%s)", e.getKey(), e.getKey());
                parameters.addValue(e.getKey(), e.getValue());
            }

        }
        return (List<SubTipEveniment>) namedParameterJdbcTemplate.query(
                sql,
                parameters,
                new SubTipEvenimentMapper()
        );
    }

    public boolean DeleteSubTipEveniment(int id){
        return namedParameterJdbcTemplate.update(
                "delete from sub_tip_eveniment where id_sub_eveniment=:id_sub_eveniment",
                new MapSqlParameterSource().addValue("id_sub_eveniment", id)
        ) == 1;
    }

    public SubTipEveniment AddSubTipEveniment(SubTipEveniment subTipEveniment) {
        String sql = " INSERT INTO SUB_TIP_EVENIMENT " +
                "(ID_TIP_EVENIMENT,NUME_CATEGORIE_SUB_EVENIMENT, " +
                "NUMAR_EVENIMENTE_ORGANIZATE_PER_SUB_EVENIMENT, " +
                "DESCRIERE,IMAGINE_SUB_EVENIMENT) " +
                "VALUES(:id_tip_eveniment , :nume_categorie_sub_eveniment , 0 , :descriere , :imagine_sub_eveniment)";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(subTipEveniment.getImagine_sub_eveniment() == null || subTipEveniment.getImagine_sub_eveniment().isEmpty())){
            bytes = Base64.decodeBase64(subTipEveniment.getImagine_sub_eveniment());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_eveniment", subTipEveniment.getId_tip_eveniment())
                .addValue("nume_categorie_sub_eveniment", subTipEveniment.getNume_categorie_sub_eveniment())
                .addValue("descriere", subTipEveniment.getDescriere())
                .addValue("imagine_sub_eveniment", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_sub_eveniment" });

        if(holder.getKey().intValue()>0){
            subTipEveniment.setId_sub_eveniment(holder.getKey().intValue());
        }else
        {
            subTipEveniment.setId_sub_eveniment(-1);
        }
        return subTipEveniment;
    }

    public SubTipEveniment UpdateSubTipEveniment(SubTipEveniment subTipEveniment, int id){
        String sql = "update SUB_TIP_EVENIMENT " +
                " set id_tip_eveniment = :id_tip_eveniment, " +
                "     nume_categorie_sub_eveniment = :nume_categorie_sub_eveniment, " +
                "     descriere = :descriere, " +
                "     imagine_sub_eveniment = :imagine_sub_eveniment " +
                " where id_sub_eveniment = :id_sub_eveniment";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(subTipEveniment.getImagine_sub_eveniment() == null || subTipEveniment.getImagine_sub_eveniment().isEmpty())){
            bytes = Base64.decodeBase64(subTipEveniment.getImagine_sub_eveniment());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_eveniment", subTipEveniment.getId_tip_eveniment())
                .addValue("nume_categorie_sub_eveniment", subTipEveniment.getNume_categorie_sub_eveniment())
                .addValue("descriere", subTipEveniment.getDescriere())
                .addValue("imagine_sub_eveniment", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_sub_eveniment", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return subTipEveniment;

        return null;
    }
}