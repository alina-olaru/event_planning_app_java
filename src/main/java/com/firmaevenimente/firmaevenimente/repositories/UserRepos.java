package com.firmaevenimente.firmaevenimente.repositories;
import com.firmaevenimente.firmaevenimente.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
@Repository
public class UserRepos {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findInfo(String nume) {
        List<User> result = jdbcTemplate.query(

                "select ID_UTILIZATOR, NUME, PRENUME from UTILIZATORI WHERE lower(NUME)=lower(:nume)",
                new Object[]{nume},
                (rs, rowNum) ->
                        new User(
                                rs.getInt("ID_UTILIZATOR"),
                                rs.getString("NUME"),
                                rs.getString("PRENUME"),
                                rs.getInt("ID_NIVEL_ACCES"))


        );
        return result;
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