package com.firmaevenimente.firmaevenimente.repositories;


import com.firmaevenimente.firmaevenimente.models.locatie.Locatie;
import com.firmaevenimente.firmaevenimente.models.locatie.LocatieMapper;
import com.firmaevenimente.firmaevenimente.models.sublocatie.SubLocatie;
import com.firmaevenimente.firmaevenimente.models.sublocatie.SubLocatieMapper;
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
import java.util.Map;

@Repository
public class LocatieRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<Locatie> GetLocatie(){

        String sql = " select a.id_locatie, " +
                "       a.id_sub_locatie, " +
                "       a.nume_locatie, " +
                "       b.nume_categorie_tip_locatie, " +
                "       a.tara, " +
                "       a.oras, " +
                "       a.adresa, " +
                "       a.strada, " +
                "       a.dimensiune_mp, " +
                "       a.capacitate_maxima, " +
                "       a.pret_inchiriere_per_24h, " +
                "       a.imagine_locatie " +
                "from locatie a " +
                "join sub_locatie b on a.id_sub_locatie = b.id_sub_locatie";
        return (List<Locatie>) namedParameterJdbcTemplate.query(
                sql,
                new LocatieMapper()
        );

    }

    public List<Locatie> GetLocatieWhere(Map<String, List<String>> wheres){
        String sql = " select a.id_locatie, " +
                "       a.id_sub_locatie, " +
                "       a.nume_locatie, " +
                "       b.nume_categorie_tip_locatie, " +
                "       a.tara, " +
                "       a.oras, " +
                "       a.adresa, " +
                "       a.strada, " +
                "       a.dimensiune_mp, " +
                "       a.capacitate_maxima, " +
                "       a.pret_inchiriere_per_24h, " +
                "       a.imagine_locatie " +
                "from locatie a " +
                "join sub_locatie b on a.id_sub_locatie = b.id_sub_locatie";
        MapSqlParameterSource parameters = new MapSqlParameterSource();

        if(wheres.size()>0) {
            sql += " where ";

            for(Map.Entry<String, List<String>> e : wheres.entrySet())
            {
                sql +=  String.format("a.%s in (:%s)", e.getKey(), e.getKey());
                parameters.addValue(e.getKey(), e.getValue());
            }

        }
        return (List<Locatie>) namedParameterJdbcTemplate.query(
                sql,
                parameters,
                new LocatieMapper()
        );
    }

    public boolean DeleteLocatie(int id){
        return namedParameterJdbcTemplate.update(
                "delete from locatie where id_locatie=:id_locatie",
                new MapSqlParameterSource().addValue("id_locatie", id)
        ) == 1;
    }

    public Locatie AddLocatie(Locatie locatie) {
        String sql = " insert into LOCATIE " +
                "(ID_SUB_LOCATIE,TARA,ORAS,ADRESA,STRADA, " +
                "DIMENSIUNE_MP,CAPACITATE_MAXIMA,PRET_INCHIRIERE_PER_24H, " +
                "IMAGINE_LOCATIE,NUME_LOCATIE) " +
                "VALUES( :id_sub_locatie, :tara , :oras , :adresa , :strada , :dimensiune_mp , " +
                ":capacitate_maxima, :pret_inchiriere_per_24h , :imagine_locatie , :nume_locatie)";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(locatie.getImagine_locatie() == null || locatie.getImagine_locatie().isEmpty())){
            bytes = Base64.decodeBase64(locatie.getImagine_locatie());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_sub_locatie", locatie.getId_sub_locatie())
                .addValue("tara", locatie.getTara())
                .addValue("oras", locatie.getOras())
                .addValue("adresa", locatie.getAdresa())
                .addValue("strada", locatie.getStrada())
                .addValue("dimensiune_mp", locatie.getDimensiune_mp())
                .addValue("capacitate_maxima", locatie.getCapacitate_maxima())
                .addValue("pret_inchiriere_per_24h", locatie.getPret_inchiriere_per_24h())
                .addValue("nume_locatie", locatie.getNume_locatie())
                .addValue("imagine_locatie", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_locatie" });

        if(holder.getKey().intValue()>0){
            locatie.setId_locatie(holder.getKey().intValue());
        }else
        {
            locatie.setId_locatie(-1);
        }
        return locatie;
    }

    public Locatie UpdateLocatie(Locatie locatie, int id){
        String sql = "update locatie " +
                " set   id_sub_locatie = :id_sub_locatie , " +
                "       nume_locatie = :nume_locatie , " +
                "       tara = :tara , " +
                "       oras = :oras , " +
                "       adresa = :adresa , " +
                "       strada = :strada , " +
                "       dimensiune_mp = :dimensiune_mp , " +
                "       capacitate_maxima = :capacitate_maxima , " +
                "       pret_inchiriere_per_24h = :pret_inchiriere_per_24h , " +
                "       imagine_locatie = :imagine_locatie " +
                " where id_locatie = :id_locatie";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(locatie.getImagine_locatie() == null || locatie.getImagine_locatie().isEmpty())){
            bytes = Base64.decodeBase64(locatie.getImagine_locatie());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_sub_locatie", locatie.getId_sub_locatie())
                .addValue("tara", locatie.getTara())
                .addValue("oras", locatie.getOras())
                .addValue("adresa", locatie.getAdresa())
                .addValue("strada", locatie.getStrada())
                .addValue("dimensiune_mp", locatie.getDimensiune_mp())
                .addValue("capacitate_maxima", locatie.getCapacitate_maxima())
                .addValue("pret_inchiriere_per_24h", locatie.getPret_inchiriere_per_24h())
                .addValue("nume_locatie", locatie.getNume_locatie())
                .addValue("imagine_locatie", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_locatie", locatie.getId_locatie());

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return locatie;

        return null;
    }
}