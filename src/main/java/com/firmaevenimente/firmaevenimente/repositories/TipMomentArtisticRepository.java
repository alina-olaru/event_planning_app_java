package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tipmomentartistic.TipMomentArtistic;
import com.firmaevenimente.firmaevenimente.models.tipmomentartistic.TipMomentArtisticMapper;
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
public class TipMomentArtisticRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipMomentArtistic> GetTipMomentArtistic(){

        String sql = "select id_tip_moment, " +
                "         nume_categorie_moment_artistic, " +
                "         imagine_tip_moment_artistic " +
                " from tip_moment_artistic";
        return (List<TipMomentArtistic>) namedParameterJdbcTemplate.query(
                sql,
                new TipMomentArtisticMapper()
        );

    }

    public boolean DeleteTipMomentArtistic(int id){
        return namedParameterJdbcTemplate.update(
                "delete from tip_moment_artistic where id_tip_moment=:id_tip_moment",
                new MapSqlParameterSource().addValue("id_tip_moment", id)
        ) == 1;
    }

    public TipMomentArtistic AddTipMomentArtistic(TipMomentArtistic tipMomentArtistic) {
        String sql = "INSERT INTO tip_moment_artistic(nume_categorie_moment_artistic,imagine_tip_moment_artistic) " +
                "VALUES(:nume_categorie_moment_artistic, :imagine_tip_moment_artistic )";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipMomentArtistic.getImagine_tip_moment_artistic() == null || tipMomentArtistic.getImagine_tip_moment_artistic().isEmpty())){
            bytes = Base64.decodeBase64(tipMomentArtistic.getImagine_tip_moment_artistic());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_categorie_moment_artistic", tipMomentArtistic.getNume_categorie_moment_artistic())
                .addValue("imagine_tip_moment_artistic", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_tip_moment" });

        if(holder.getKey().intValue()>0){
            tipMomentArtistic.setId_tip_moment(holder.getKey().intValue());
        }else
        {
            tipMomentArtistic.setId_tip_moment(-1);
        }
        return tipMomentArtistic;
    }

    public TipMomentArtistic UpdateTipMomentArtistic(TipMomentArtistic tipMomentArtistic, int id){
        String sql = "update tip_moment_artistic " +
                " set nume_categorie_moment_artistic = :nume_categorie_moment_artistic," +
                "    imagine_tip_moment_artistic = :imagine_tip_moment_artistic" +
                " where id_tip_moment = :id_tip_moment";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipMomentArtistic.getImagine_tip_moment_artistic() == null || tipMomentArtistic.getImagine_tip_moment_artistic().isEmpty())){
            bytes = Base64.decodeBase64(tipMomentArtistic.getImagine_tip_moment_artistic());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_categorie_moment_artistic", tipMomentArtistic.getNume_categorie_moment_artistic())
                .addValue("imagine_tip_moment_artistic", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_tip_moment", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return tipMomentArtistic;

        return null;
    }
}
