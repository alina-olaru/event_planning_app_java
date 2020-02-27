package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.media.Media;
import com.firmaevenimente.firmaevenimente.models.media.MediaMapper;
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
public class MediaRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<Media> GetMedia(){

        String sql = " select a.id_media, " +
                "       a.id_tip_media, " +
                "       a.denumire, " +
                "       b.nume_media, " +
                "       a.descriere, " +
                "       a.pret, " +
                "       a.imagine_media " +
                "from media a " +
                "join tip_media b on a.id_tip_media = b.id_tip_media";
        return (List<Media>) namedParameterJdbcTemplate.query(
                sql,
                new MediaMapper()
        );

    }

    public boolean DeleteMedia(int id){
        return namedParameterJdbcTemplate.update(
                "delete from media where id_media=:id_media",
                new MapSqlParameterSource().addValue("id_media", id)
        ) == 1;
    }

    public Media AddMedia(Media media) {
        String sql = " insert into MEDIA " +
                "(ID_TIP_MEDIA,DENUMIRE,PRET,DESCRIERE,IMAGINE_MEDIA) " +
                "VALUES( :id_tip_media, :denumire  , :pret , :descriere , :imagine_media)";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(media.getImagine_media() == null || media.getImagine_media().isEmpty())){
            bytes = Base64.decodeBase64(media.getImagine_media());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_media", media.getId_tip_media())
                .addValue("denumire", media.getDenumire())
                .addValue("pret", media.getPret())
                .addValue("descriere", media.getDescriere())
                .addValue("imagine_media", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_media" });

        if(holder.getKey().intValue()>0){
            media.setId_media(holder.getKey().intValue());
        }else
        {
            media.setId_media(-1);
        }
        return media;
    }

    public Media UpdateMedia(Media media, int id){
        String sql = "update media " +
                " set   id_tip_media = :id_tip_media , " +
                "       denumire = :denumire , " +
                "       pret = :pret , " +
                "       descriere = :descriere, " +
                "       imagine_media = :imagine_media " +
                " where id_media = :id_media";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(media.getImagine_media() == null || media.getImagine_media().isEmpty())){
            bytes = Base64.decodeBase64(media.getImagine_media());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_media", media.getId_tip_media())
                .addValue("denumire", media.getDenumire())
                .addValue("pret", media.getPret())
                .addValue("descriere", media.getDescriere())
                .addValue("imagine_media", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_media", media.getId_media());

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return media;

        return null;
    }
}