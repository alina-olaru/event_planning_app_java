package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.momenteartistice.MomenteArtistice;
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
public class MomenteArtisticeRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<MomenteArtistice> GetMomenteArtistice(){

        String sql = "select a.id_moment_artistic, " +
                "       a.id_tip_moment, " +
                "       a.nume_tip_moment_artistic, " +
                "       b.nume_categorie_moment_artistic, " +
                "       a.timp_moment, " +
                "       a.pret_per_moment, " +
                "       a.numar_persoane_implicate " +
                "from momente_artistice a " +
                "join tip_moment_artistic b on a.id_tip_moment = b.id_tip_moment";
        return (List<MomenteArtistice>) namedParameterJdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<MomenteArtistice>(MomenteArtistice.class)
        );

    }

    public boolean DeleteMomenteArtistice(int id){
        return namedParameterJdbcTemplate.update(
                "delete from momente_artistice where id_moment_artistic=:id_moment_artistic",
                new MapSqlParameterSource().addValue("id_moment_artistic", id)
        ) == 1;
    }

    public MomenteArtistice AddMomenteArtistice(MomenteArtistice momenteArtistice) {
        String sql = "insert into MOMENTE_ARTISTICE " +
                "(ID_TIP_MOMENT,NUME_TIP_MOMENT_ARTISTIC,TIMP_MOMENT,PRET_PER_MOMENT,NUMAR_PERSOANE_IMPLICATE) " +
                "VALUES(:id_tip_moment , :nume_tip_moment_artistic , :timp_moment , :pret_per_moment , :numar_persoane_implicate)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_moment", momenteArtistice.getId_tip_moment())
                .addValue("nume_tip_moment_artistic", momenteArtistice.getNume_tip_moment_artistic())
                .addValue("timp_moment", momenteArtistice.getTimp_moment())
                .addValue("pret_per_moment", momenteArtistice.getPret_per_moment())
                .addValue("numar_persoane_implicate", momenteArtistice.getNumar_persoane_implicate());

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_moment_artistic" });

        if(holder.getKey().intValue()>0){
            momenteArtistice.setId_moment_artistic(holder.getKey().intValue());
        }else
        {
            momenteArtistice.setId_moment_artistic(-1);
        }
        return momenteArtistice;
    }

    public MomenteArtistice UpdateMomenteArtistice(MomenteArtistice momenteArtistice, int id){
        String sql = "update MOMENTE_ARTISTICE" +
                " set id_tip_moment = :id_tip_moment," +
                " nume_tip_moment_artistic = :nume_tip_moment_artistic," +
                " timp_moment = :timp_moment," +
                " pret_per_moment = :pret_per_moment," +
                " numar_persoane_implicate = :numar_persoane_implicate" +
                " where id_moment_artistic = :id_moment_artistic";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_tip_moment", momenteArtistice.getId_tip_moment())
                .addValue("nume_tip_moment_artistic", momenteArtistice.getNume_tip_moment_artistic())
                .addValue("timp_moment", momenteArtistice.getTimp_moment())
                .addValue("pret_per_moment", momenteArtistice.getPret_per_moment())
                .addValue("numar_persoane_implicate", momenteArtistice.getNumar_persoane_implicate())
                .addValue("id_moment_artistic", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return momenteArtistice;

        return null;
    }
}