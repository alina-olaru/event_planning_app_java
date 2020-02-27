package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tipmedia.TipMedia;
import com.firmaevenimente.firmaevenimente.models.tipmedia.TipMediaMapper;
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
public class TipMediaRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipMedia> GetTipMedia(){

        String sql = "select id_tip_media, " +
                "         nume_media, " +
                "         imagine_tip_media " +
                " from tip_media";
        return (List<TipMedia>) namedParameterJdbcTemplate.query(
                sql,
                new TipMediaMapper()
        );

    }

    public boolean DeleteTipMedia(int id){
        return namedParameterJdbcTemplate.update(
                "delete from tip_media where id_tip_media=:id_tip_media",
                new MapSqlParameterSource().addValue("id_tip_media", id)
        ) == 1;
    }

    public TipMedia AddTipMedia(TipMedia tipMedia) {
        String sql = "INSERT INTO TIP_MEDIA(NUME_MEDIA,IMAGINE_TIP_MEDIA) " +
                "VALUES(:nume_media, :imagine_tip_media )";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipMedia.getImagine_tip_media() == null || tipMedia.getImagine_tip_media().isEmpty())){
            bytes = Base64.decodeBase64(tipMedia.getImagine_tip_media());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_media", tipMedia.getNume_media())
                .addValue("imagine_tip_media", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_tip_media" });

        if(holder.getKey().intValue()>0){
            tipMedia.setId_tip_media(holder.getKey().intValue());
        }else
        {
            tipMedia.setId_tip_media(-1);
        }
        return tipMedia;
    }

    public TipMedia UpdateTipMedia(TipMedia tipMedia, int id){
        String sql = "update TIP_MEDIA " +
                " set nume_media = :nume_media," +
                "    imagine_tip_media = :imagine_tip_media" +
                " where id_tip_media = :id_tip_media";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipMedia.getImagine_tip_media() == null || tipMedia.getImagine_tip_media().isEmpty())){
            bytes = Base64.decodeBase64(tipMedia.getImagine_tip_media());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_media", tipMedia.getNume_media())
                .addValue("imagine_tip_media", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_tip_media", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return tipMedia;

        return null;
    }
}
