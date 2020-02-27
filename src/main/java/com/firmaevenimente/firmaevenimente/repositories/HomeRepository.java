package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.home.HomeEveniment;
import com.firmaevenimente.firmaevenimente.models.home.TopEveniment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HomeRepository {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<HomeEveniment> GetEvenimenteUser(int id_utilizator, float min_cost_total, float max_cost_total){
        String sql = " select * from ( " +
                " select a.id_utilizator, " +
                "       a.id_eveniment, " +
                "       a.data_inceput_eveniment, " +
                "       a.data_sfarsit_eveniment, " +
                "       a.mentiuni, " +
                "       a.id_sub_eveniment, " +
                "       b.nume_categorie_sub_eveniment, " +
                "       a.id_locatie, " +
                "       c.nume_locatie, " +
                "       c.tara, " +
                "       c.oras, " +
                "       d.cost_acces, " +
                "       d.cost_bautura, " +
                "       d.cost_elemente_design, " +
                "       d.cost_media, " +
                "       d.cost_meniu, " +
                "       d.cost_momente_artistice, " +
                "       (d.cost_acces + d.cost_bautura + d.cost_elemente_design + d.cost_media + d.cost_meniu + d.cost_momente_artistice) as cost_total_eveniment " +
                " from eveniment_organizat a " +
                " left join sub_tip_eveniment b on a.id_sub_eveniment = b.id_sub_eveniment " +
                " left join locatie c on a.id_locatie = c.id_locatie " +
                " left join COSTURI_EVENIMENTE d on a.id_eveniment = d.id_eveniment) x " +
                " where x.id_utilizator = :id_utilizator" +
                " and cost_total_eveniment >= :min_cost_total ";



        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("id_utilizator", id_utilizator);
        parameters.addValue("min_cost_total", min_cost_total);

        if(max_cost_total > 0){
          sql += " and cost_total_eveniment <=  :max_cost_total ";
            parameters.addValue("max_cost_total", max_cost_total);
        }


        return (List<HomeEveniment>) namedParameterJdbcTemplate.query(
                sql,
                parameters,
                new BeanPropertyRowMapper<HomeEveniment>(HomeEveniment.class)
        );    }

    public List<TopEveniment> GetTopTipEvenimente(int id_utilizator, int minim_evenimente){
        String sql = " select b.nume_categorie_sub_eveniment, " +
                "       count(a.id_eveniment) as numar_evenimente " +
                " from eveniment_organizat a " +
                " left join sub_tip_eveniment b on a.id_sub_eveniment = b.id_sub_eveniment " +
                " where a.id_utilizator = :id_utilizator " +
                " group by b.nume_categorie_sub_eveniment " +
                " having count(a.id_eveniment) > :minim_evenimente " +
                " order by count(a.id_eveniment) desc";



        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("id_utilizator", id_utilizator);
        parameters.addValue("minim_evenimente", minim_evenimente);

        return (List<TopEveniment>) namedParameterJdbcTemplate.query(
                sql,
                parameters,
                new BeanPropertyRowMapper<TopEveniment>(TopEveniment.class)
        );    }

}
