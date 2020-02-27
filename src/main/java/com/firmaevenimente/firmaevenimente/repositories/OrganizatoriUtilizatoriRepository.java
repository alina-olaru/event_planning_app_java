package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.utilizatori.Utilizator;
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
public class OrganizatoriUtilizatoriRepository {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<Utilizator> GetUtilizatori(){

        String sql = "select a.ID_UTILIZATOR, a.ID_NIVEL_ACCES, a.NUME, a.PRENUME, a.NUMAR_TELEFON, a.ADRESA_MAIL, a.NUMAR_EVENIMENTE_CREATE, a.USERNAME, a.PAROLA, a.ROL from utilizatori_organizatori a ";
        return (List<Utilizator>) namedParameterJdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<Utilizator>(Utilizator.class)
        );

    }

    public boolean DeleteUtilizator(int id){
        return namedParameterJdbcTemplate.update(
                "delete from utilizatori_organizatori where ID_UTILIZATOR=:id_utilizator",
                new MapSqlParameterSource().addValue("id_utilizator", id)
        ) == 1;
    }

    public Utilizator AddUtilizator(Utilizator utilizator) {
        String sql = "INSERT INTO utilizatori_organizatori " +
                "(id_nivel_acces,NUME,PRENUME,NUMAR_TELEFON,ADRESA_MAIL,NUMAR_EVENIMENTE_CREATE,USERNAME,PAROLA) " +
                "VALUES(:id_nivel_acces, :nume, :prenume, :numar_telefon, :adresa_mail, 0, :username, :parola )";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_nivel_acces", utilizator.getId_nivel_acces())
                .addValue("nume", utilizator.getNume())
                .addValue("prenume", utilizator.getPrenume())
                .addValue("numar_telefon", utilizator.getNumar_telefon())
                .addValue("adresa_mail", utilizator.getAdresa_mail())
                .addValue("username", utilizator.getUsername())
                .addValue("parola", utilizator.getParola());

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "ID_UTILIZATOR" });

        if(holder.getKey().intValue()>0){
            utilizator.setId_utilizator(holder.getKey().intValue());
        }else
        {
            utilizator.setId_utilizator(-1);
        }
        return utilizator;
    }

    public Utilizator UpdateUtilizator(Utilizator utilizator, int id){
        String sql = "update utilizatori_organizatori" +
                " set id_nivel_acces = :id_nivel_acces," +
                " nume = :nume," +
                " prenume = :prenume," +
                " numar_telefon = :numar_telefon," +
                " adresa_mail = :adresa_mail," +
                " username = :username," +
                " parola = :parola" +
                " where ID_UTILIZATOR = :id_utilizator";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_nivel_acces", utilizator.getId_nivel_acces())
                .addValue("nume", utilizator.getNume())
                .addValue("prenume", utilizator.getPrenume())
                .addValue("numar_telefon", utilizator.getNumar_telefon())
                .addValue("adresa_mail", utilizator.getAdresa_mail())
                .addValue("username", utilizator.getUsername())
                .addValue("parola", utilizator.getParola())
                .addValue("id_utilizator", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return utilizator;

        return null;
    }

}
