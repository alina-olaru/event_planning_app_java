package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.tipserviremeniu.TipServireMeniu;
import com.firmaevenimente.firmaevenimente.models.tipserviremeniu.TipServireMeniuMapper;
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
public class TipServireMeniuRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<TipServireMeniu> GetTipServireMeniu(){

        String sql = "select id_tip_servire_meniu, " +
                "         denumire_tip_servire, " +
                "         imagine_tip_servire " +
                " from tip_servire_meniu";
        return (List<TipServireMeniu>) namedParameterJdbcTemplate.query(
                sql,
                new TipServireMeniuMapper()
        );

    }

    public boolean DeleteTipServireMeniu(int id){
        return namedParameterJdbcTemplate.update(
                "delete from tip_servire_meniu where id_tip_servire_meniu=:id_tip_servire_meniu",
                new MapSqlParameterSource().addValue("id_tip_servire_meniu", id)
        ) == 1;
    }

    public TipServireMeniu AddTipServireMeniu(TipServireMeniu tipServireMeniu) {
        String sql = "INSERT INTO tip_servire_meniu(denumire_tip_servire,imagine_tip_servire) " +
                "VALUES(:denumire_tip_servire, :imagine_tip_servire )";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipServireMeniu.getImagine_tip_servire() == null || tipServireMeniu.getImagine_tip_servire().isEmpty())){
            bytes = Base64.decodeBase64(tipServireMeniu.getImagine_tip_servire());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("denumire_tip_servire", tipServireMeniu.getDenumire_tip_servire())
                .addValue("imagine_tip_servire", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "id_tip_servire_meniu" });

        if(holder.getKey().intValue()>0){
            tipServireMeniu.setId_tip_servire_meniu(holder.getKey().intValue());
        }else
        {
            tipServireMeniu.setId_tip_servire_meniu(-1);
        }
        return tipServireMeniu;
    }

    public TipServireMeniu UpdateTipServireMeniu(TipServireMeniu tipServireMeniu, int id){
        String sql = "update tip_servire_meniu " +
                " set denumire_tip_servire = :denumire_tip_servire," +
                "    imagine_tip_servire = :imagine_tip_servire" +
                " where id_tip_servire_meniu = :id_tip_servire_meniu";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(tipServireMeniu.getImagine_tip_servire() == null || tipServireMeniu.getImagine_tip_servire().isEmpty())){
            bytes = Base64.decodeBase64(tipServireMeniu.getImagine_tip_servire());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("denumire_tip_servire", tipServireMeniu.getDenumire_tip_servire())
                .addValue("imagine_tip_servire", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_tip_servire_meniu", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return tipServireMeniu;

        return null;
    }
}
