package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.organizatori.Organizatori;
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
public class OrganizatoriRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<Organizatori> GetOrganizatori(){

        String sql = "select a.id_organizator, " +
                "       a.nume, " +
                "       a.prenume, " +
                "       a.adresa_mail, " +
                "       a.numar_contact, " +
                "       a.numar_evenimente_organizate " +
                "from organizatori a ";
        return (List<Organizatori>) namedParameterJdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<Organizatori>(Organizatori.class)
        );

    }

    public boolean DeleteOrganizatori(int id){
        return namedParameterJdbcTemplate.update(
                "delete from organizatori where id_organizator=:id_organizator",
                new MapSqlParameterSource().addValue("id_organizator", id)
        ) == 1;
    }

    public Organizatori AddOrganizatori(Organizatori organizatori) {
        String sql = "insert into organizatori\n" +
                "(nume,prenume,adresa_mail,numar_contact,\n" +
                "numar_evenimente_organizate)\n" +
                "values(:nume, :prenume , :adresa_mail , :numar_contact, 0)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume", organizatori.getNume())
                .addValue("prenume", organizatori.getPrenume())
                .addValue("adresa_mail", organizatori.getAdresa_mail())
                .addValue("numar_contact", organizatori.getNumar_contact());

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_organizator" });

        if(holder.getKey().intValue()>0){
            organizatori.setId_organizator(holder.getKey().intValue());
        }else
        {
            organizatori.setId_organizator(-1);
        }
        return organizatori;
    }

    public Organizatori UpdateOrganizatori(Organizatori organizatori, int id){
        String sql = "update organizatori" +
                " set nume = :nume," +
                " prenume = :prenume," +
                " adresa_mail = :adresa_mail," +
                " numar_contact = :numar_contact " +
                " where id_organizator = :id_organizator";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume", organizatori.getNume())
                .addValue("prenume", organizatori.getPrenume())
                .addValue("adresa_mail", organizatori.getAdresa_mail())
                .addValue("numar_contact", organizatori.getNumar_contact())
                .addValue("id_organizator", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return organizatori;

        return null;
    }
}