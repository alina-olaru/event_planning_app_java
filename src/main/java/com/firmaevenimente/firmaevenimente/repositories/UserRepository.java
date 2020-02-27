package com.firmaevenimente.firmaevenimente.repositories;
import com.firmaevenimente.firmaevenimente.models.autentificare.LoginUserModel;
import com.firmaevenimente.firmaevenimente.models.autentificare.RegisterUserModel;
import com.firmaevenimente.firmaevenimente.models.autentificare.User;
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
public class UserRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public User loginUser(LoginUserModel userModel){

        List<User> user = namedParameterJdbcTemplate.query(
                "select ID_UTILIZATOR, ID_NIVEL_ACCES, NUME, PRENUME, NUMAR_TELEFON, ADRESA_MAIL, NUMAR_EVENIMENTE_CREATE from utilizatori WHERE lower(USERNAME)=:utilizator AND PAROLA=:parola AND ROWNUM=1",
                 new MapSqlParameterSource().addValue("utilizator", userModel.username.toLowerCase()).addValue("parola", userModel.password),
                //new Object[]{userModel.username.toLowerCase(), userModel.password},
                new BeanPropertyRowMapper<User>(User.class));

        if(user.isEmpty())
            return null;

        return user.get(0);

    }

    public User registerUser(RegisterUserModel userModel){

        String insertSql = "insert into UTILIZATORI(ID_NIVEL_ACCES, NUME, PRENUME, NUMAR_TELEFON, ADRESA_MAIL, USERNAME, PAROLA) values (:id_nivel_acces, :nume, :prenume, :numar_telefon, :adresa_mail, :username, :parola)";
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id_nivel_acces", 3)
                .addValue("nume", userModel.nume)
                .addValue("prenume", userModel.prenume)
                .addValue("numar_telefon", userModel.numar_telefon)
                .addValue("adresa_mail", userModel.username)
                .addValue("parola", userModel.parola);
        namedParameterJdbcTemplate.update(insertSql, parameters, holder);

        if(holder.getKey().intValue()>0){

            User user = new User();
            user.setId_utilizator(holder.getKey().intValue());
            user.setId_nivel_acces(3);
            user.setNume(userModel.nume);
            user.setPrenume(userModel.prenume);
            user.setAdresa_email(userModel.adresa_mail);
            user.setNumar_telefon(userModel.numar_telefon);
            user.setNumar_evenimente_create(0);

            return user;
        }

        return null;
    }

}

/*
*
*
*
@Repository
public class TestRepos {

@Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findAll(){

        List<User> result = jdbcTemplate.query(
                "select ID_UTILIZATOR, NUME, PRENUME from UTILIZATORI",
                (rs, rowNum) ->
                        new User(
                        rs.getInt("ID_UTILIZATOR"),
                        rs.getString("NUME"),
                        rs.getString("PRENUME"),
                        rs.getInt("ID_NIVEL_ACCES"))

        );



        return  result;

    }

}
*/