package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.bautura.Bautura;
import com.firmaevenimente.firmaevenimente.models.bautura.BauturaMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.support.AbstractLobCreatingPreparedStatementCallback;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobCreator;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.stereotype.Repository;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Repository
public class BauturaRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<Bautura> GetBautura(){

        String sql = "select id_bautura," +
                " pret_pret_bucata," +
                " pret_per_bax," +
                " nume_bautura," +
                " gramaj," +
                " imagine_bautura" +
                " from BAUTURA";
        return (List<Bautura>) namedParameterJdbcTemplate.query(
                sql,
                new BauturaMapper()
        );

    }

    public boolean DeleteBautura(int id){
        return namedParameterJdbcTemplate.update(
                "delete from BAUTURA where ID_BAUTURA=:id_bautura",
                new MapSqlParameterSource().addValue("id_bautura", id)
        ) == 1;
    }

    public Bautura AddBautura(Bautura bautura) {
        String sql = "insert into bautura(pret_pret_bucata,PRET_PER_BAX,NUME_BAUTURA,GRAMAJ,IMAGINE_BAUTURA) " +
                "VALUES(:pret_pret_bucata, :pret_per_bax, :nume_bautura, :gramaj, :imagine_bautura)";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(bautura.getImagine_bautura() == null || bautura.getImagine_bautura().isEmpty())){
            bytes = Base64.decodeBase64(bautura.getImagine_bautura());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("pret_pret_bucata", bautura.getPret_pret_bucata())
                .addValue("pret_per_bax", bautura.getPret_per_bax())
                .addValue("nume_bautura", bautura.getNume_bautura())
                .addValue("gramaj", bautura.getGramaj())
                .addValue("imagine_bautura", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "ID_BAUTURA" });

        if(holder.getKey().intValue()>0){
            bautura.setId_bautura(holder.getKey().intValue());
        }else
        {
            bautura.setId_bautura(-1);
        }
        return bautura;
    }

    public Bautura UpdateBautura(Bautura bautura, int id){
        String sql = "update BAUTURA " +
                " set pret_pret_bucata = :pret_pret_bucata," +
                "    pret_per_bax = :pret_per_bax," +
                "    nume_bautura = :nume_bautura," +
                "    gramaj = :gramaj," +
                "    imagine_bautura = :imagine_bautura" +
                " where id_bautura = :id_bautura";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(bautura.getImagine_bautura() == null || bautura.getImagine_bautura().isEmpty())){
            bytes = Base64.decodeBase64(bautura.getImagine_bautura());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("pret_pret_bucata", bautura.getPret_pret_bucata())
                .addValue("pret_per_bax", bautura.getPret_per_bax())
                .addValue("nume_bautura", bautura.getNume_bautura())
                .addValue("gramaj", bautura.getGramaj())
                .addValue("imagine_bautura", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_bautura", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return bautura;

        return null;
    }
}
