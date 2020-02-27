package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.elementedesign.ElementeDesign;
import com.firmaevenimente.firmaevenimente.models.elementedesign.ElementeDesignMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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
public class ElementeDesignRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<ElementeDesign> GetElementeDesign(){

        String sql = "select id_element_design, " +
                "       nume_element, " +
                "       culoare, " +
                "       cantitate, " +
                "       dimensiuni, " +
                "       pret_per_element, " +
                "       discount, " +
                "       numar_minim_elemente_pentru_reducere, " +
                "       imagine_element_design " +
                "from ELEMENTE_DESIGN ";
        return (List<ElementeDesign>) namedParameterJdbcTemplate.query(
                sql,
                new ElementeDesignMapper()
        );

    }

    public boolean DeleteElementeDesign(int id){
        return namedParameterJdbcTemplate.update(
                "delete from ELEMENTE_DESIGN where id_element_design=:id_element_design",
                new MapSqlParameterSource().addValue("id_element_design", id)
        ) == 1;
    }

    public ElementeDesign AddElementeDesign(ElementeDesign elementeDesign) {
        String sql = "INSERT INTO ELEMENTE_DESIGN(NUME_ELEMENT,CULOARE,CANTITATE,DIMENSIUNI,PRET_PER_ELEMENT,DISCOUNT,NUMAR_MINIM_ELEMENTE_PENTRU_REDUCERE,IMAGINE_ELEMENT_DESIGN) " +
                " VALUES(:nume_element, :culoare, :cantitate, :dimensiuni, :pret_per_element, :discount, :numar_minim_elemente_pentru_reducere, :imagine_element_design)";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(elementeDesign.getImagine_element_design() == null || elementeDesign.getImagine_element_design().isEmpty())){
            bytes = Base64.decodeBase64(elementeDesign.getImagine_element_design());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_element", elementeDesign.getNume_element())
                .addValue("culoare", elementeDesign.getCuloare())
                .addValue("cantitate", elementeDesign.getCantitate())
                .addValue("dimensiuni", elementeDesign.getDimensiuni())
                .addValue("pret_per_element", elementeDesign.getPret_per_element())
                .addValue("discount", elementeDesign.getDiscount())
                .addValue("numar_minim_elemente_pentru_reducere", elementeDesign.getNumar_minim_elemente_pentru_reducere())
                .addValue("imagine_element_design", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB);

        namedParameterJdbcTemplate.update(sql, parameters, holder, new String[] { "ID_ELEMENT_DESIGN" });

        if(holder.getKey().intValue()>0){
            elementeDesign.setId_element_design(holder.getKey().intValue());
        }else
        {
            elementeDesign.setId_element_design(-1);
        }
        return elementeDesign;
    }

    public ElementeDesign UpdateElementeDesign(ElementeDesign elementeDesign, int id){
        String sql = " update elemente_design " +
                " set nume_element = :nume_element, " +
                "   culoare = :culoare, " +
                "   cantitate = :cantitate, " +
                "   dimensiuni = :dimensiuni, " +
                "   pret_per_element = :pret_per_element, " +
                "   discount = :discount, " +
                "   numar_minim_elemente_pentru_reducere = :numar_minim_elemente_pentru_reducere, " +
                "   imagine_element_design = :imagine_element_design " +
                " where id_element_design = :id_element_design";
        KeyHolder holder = new GeneratedKeyHolder();
        byte[] bytes = {};

        if(!(elementeDesign.getImagine_element_design() == null || elementeDesign.getImagine_element_design().isEmpty())){
            bytes = Base64.decodeBase64(elementeDesign.getImagine_element_design());
        }

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("nume_element", elementeDesign.getNume_element())
                .addValue("culoare", elementeDesign.getCuloare())
                .addValue("cantitate", elementeDesign.getCantitate())
                .addValue("dimensiuni", elementeDesign.getDimensiuni())
                .addValue("pret_per_element", elementeDesign.getPret_per_element())
                .addValue("discount", elementeDesign.getDiscount())
                .addValue("numar_minim_elemente_pentru_reducere", elementeDesign.getNumar_minim_elemente_pentru_reducere())
                .addValue("imagine_element_design", bytes.length == 0 ? null :
                        new SqlLobValue(bytes), Types.BLOB)
                .addValue("id_element_design", id);

        int affected = namedParameterJdbcTemplate.update(sql, parameters, holder);

        if(affected > 0)
            return elementeDesign;

        return null;
    }
}
