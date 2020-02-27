package com.firmaevenimente.firmaevenimente.repositories;

import com.firmaevenimente.firmaevenimente.models.wizard.*;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.management.BadAttributeValueExpException;
import java.sql.Types;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class WizardRepository {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public boolean CheckIfDayAvailable(Date data_inceput, Date data_sfarsit) {

        AtomicInteger nr_organizatori = new AtomicInteger();
        nr_organizatori.set(0);

        String sql = "select y.nr_organizatori - ( " +
                "( " +
                "    select count(distinct(b.id_organizator)) " +
                "    from eveniment_organizat a " +
                "    join responsabili b on a.id_eveniment = b.id_eveniment " +
                "    where a.data_inceput_eveniment >= sysdate " +
                "    and a.data_sfarsit_eveniment <= sysdate " +
                ")  " +
                ") as nr_organizatori_valabili from ( " +
                "select count(id_organizator) as nr_organizatori " +
                "from organizatori) y";
        namedParameterJdbcTemplate.query(
                sql,
                resultSet -> {
                    nr_organizatori.set(resultSet.getInt("nr_organizatori_valabili"));
                }
        );

        if (nr_organizatori.get() == 0)
            return false;
        return true;
    }

    @Transactional
    public AddEvenimentRaspuns AddEveniment(AddEveniment addEveniment) {
        try {

            // 1. adaugam in tabela eveniment_organizat

            String sql_eveniment_organizat = "insert into eveniment_organizat " +
                    "(id_utilizator,id_sub_eveniment,id_locatie,data_inceput_eveniment, " +
                    "data_sfarsit_eveniment,mentiuni) " +
                    "values(:id_utilizator, :id_sub_eveniment, :id_locatie, :data_inceput_eveniment, :data_sfarsit_eveniment, :mentiuni)";

            KeyHolder holder_eveniment_organizat = new GeneratedKeyHolder();
            SqlParameterSource parameters_eveniment_organizat = new MapSqlParameterSource()
                    .addValue("id_utilizator", addEveniment.id_utilizator)
                    .addValue("id_sub_eveniment", addEveniment.id_sub_eveniment)
                    .addValue("id_locatie", addEveniment.id_locatie)
                    .addValue("data_inceput_eveniment", addEveniment.data_inceput_eveniment)
                    .addValue("data_sfarsit_eveniment", addEveniment.data_sfarsit_eveniment)
                    .addValue("mentiuni", addEveniment.mentiuni);

            namedParameterJdbcTemplate.update(sql_eveniment_organizat, parameters_eveniment_organizat, holder_eveniment_organizat, new String[] { "id_eveniment" });

            if(holder_eveniment_organizat.getKey().intValue()>0){
                addEveniment.id_eveniment = holder_eveniment_organizat.getKey().intValue();
            }else
            {
                throw new Exception("Nu s-a putut crea evenimentul, verifica ca datele introduse sa fie corecte!");
            }

            // 2. bautura eveniment
            for (BauturaEveniment e : addEveniment.bauturaEveniment) {
                String sql_bautura_eveniment = "INSERT INTO BAUTURA_EVENIMENT_INREGISTRAT" +
                        "(id_eveniment, id_bautura, pret_vanzare, cantitate, cost_total, cost_unitar) " +
                        "VALUES(:id_eveniment, :id_bautura, :pret_vanzare, :cantitate, :cost_total, :cost_unitar)";

                SqlParameterSource parameters_bautura_eveniment = new MapSqlParameterSource()
                        .addValue("id_eveniment", addEveniment.id_eveniment)
                        .addValue("id_bautura", e.getId_bautura())
                        .addValue("pret_vanzare", e.getPret_vanzare())
                        .addValue("cantitate", e.getCantitate())
                        .addValue("cost_total", e.getCost_total())
                        .addValue("cost_unitar", e.getCost_unitar());

                int rows_affected_bautura = namedParameterJdbcTemplate.update(sql_bautura_eveniment, parameters_bautura_eveniment);

                if (rows_affected_bautura == 0) {
                    throw new Exception("Nu s-a putut adauga bautura, verifica ca datele introduse sa fie corecte!");
                }
            }

            // 3. Elemente design
            for (ElementeDesignEveniment e : addEveniment.elementeDesignEveniment) {
                String sql = "INSERT INTO ELEMENTE_DESIGN_EVENIMENT_INREGISTRAT" +
                        "(id_eveniment, id_element_design, cantitate, cost_total, cost_unitar) " +
                        "VALUES(:id_eveniment, :id_element_design, :cantitate, :cost_total, :cost_unitar)";

                SqlParameterSource parameters = new MapSqlParameterSource()
                        .addValue("id_eveniment", addEveniment.id_eveniment)
                        .addValue("id_element_design", e.getId_element_design())
                        .addValue("cantitate", e.getCantitate())
                        .addValue("cost_total", e.getCost_total())
                        .addValue("cost_unitar", e.getCost_unitar());

                int rows_affected_bautura = namedParameterJdbcTemplate.update(sql, parameters);

                if (rows_affected_bautura == 0) {
                    throw new Exception("Nu s-a putut adauga element design, verifica ca datele introduse sa fie corecte!");
                }
            }

            // 4. Momente artistice
            for (MomenteArtisticeEveniment e : addEveniment.momenteArtisticeEveniment) {
                String sql = "INSERT INTO MOMENTE_ARTISTICE_EVENIMENT_INREGISTRAT" +
                        "(id_eveniment, id_moment_artistic, cost, ora_inceput, ora_sfarsit) " +
                        "VALUES(:id_eveniment, :id_moment_artistic, :cost, :ora_inceput, :ora_sfarsit)";

                SqlParameterSource parameters = new MapSqlParameterSource()
                        .addValue("id_eveniment", addEveniment.id_eveniment)
                        .addValue("id_moment_artistic", e.getId_moment_artistic())
                        .addValue("cost", e.getCost())
                        .addValue("ora_inceput", e.getOra_inceput())
                        .addValue("ora_sfarsit", e.getOra_sfarsit());

                int rows_affected_bautura = namedParameterJdbcTemplate.update(sql, parameters);

                if (rows_affected_bautura == 0) {
                    throw new Exception("Nu s-a putut adauga momentul artistic, verifica ca datele introduse sa fie corecte!");
                }
            }

            // 5 Media
            for (MediaEveniment e : addEveniment.mediaEveniment) {
                String sql = "INSERT INTO MEDIA_EVENIMENT_INREGISTRAT" +
                        "(id_eveniment, id_media, cantitate, cost_total, cost_unitar) " +
                        "VALUES(:id_eveniment, :id_media, :cantitate, :cost_total, :cost_unitar)";

                SqlParameterSource parameters = new MapSqlParameterSource()
                        .addValue("id_eveniment", addEveniment.id_eveniment)
                        .addValue("id_media", e.getId_media())
                        .addValue("cantitate", e.getCantitate())
                        .addValue("cost_total", e.getCost_total())
                        .addValue("cost_unitar", e.getCost_unitar());

                int rows_affected_bautura = namedParameterJdbcTemplate.update(sql, parameters);

                if (rows_affected_bautura == 0) {
                    throw new Exception("Nu s-a putut adauga momentul artistic, verifica ca datele introduse sa fie corecte!");
                }
            }

            // 6 Tip meniu
            for (TipMeniuEveniment e : addEveniment.tipMeniuEveniment) {
                String sql = "INSERT INTO MENIU_EVENIMENT_INREGISTRAT" +
                        "(id_eveniment, id_tip_meniu, cantitate_tip_meniu, cost_total, cost_unitar_tip_meniu) " +
                        "VALUES(:id_eveniment, :id_tip_meniu, :cantitate_tip_meniu, :cost_total, :cost_unitar_tip_meniu)";

                SqlParameterSource parameters = new MapSqlParameterSource()
                        .addValue("id_eveniment", addEveniment.id_eveniment)
                        .addValue("id_tip_meniu", e.getId_tip_meniu())
                        .addValue("cantitate_tip_meniu", e.getCantitate_tip_meniu())
                        .addValue("cost_total", e.getCost_total())
                        .addValue("cost_unitar_tip_meniu", e.getCost_unitar_tip_meniu());

                int rows_affected_bautura = namedParameterJdbcTemplate.update(sql, parameters);

                if (rows_affected_bautura == 0) {
                    throw new Exception("Nu s-a putut adauga tipul de meniu, verifica ca datele introduse sa fie corecte!");
                }
            }

            // 7 Acces
            for (ConfigurariTipAccesEveniment e : addEveniment.configurariTipAccesEveniment) {
                String sql = "INSERT INTO ACCES_EVENIMENT_INREGISTRAT" +
                        "(id_eveniment, id_configurari_acces, cantitate_acces, pret_acces, discount_avans, " +
                        " discount_student, cost_realizare_total, cost_unitar_tip_acces, data_inceput_vanzare, data_final_vanzare ) " +
                        "VALUES(:id_eveniment, :id_configurari_acces, :cantitate_acces, :pret_acces, :discount_avans, " +
                        " :discount_student, :cost_realizare_total, :cost_unitar_tip_acces, :data_inceput_vanzare, :data_final_vanzare ) ";

                SqlParameterSource parameters = new MapSqlParameterSource()
                        .addValue("id_eveniment", addEveniment.id_eveniment)
                        .addValue("id_configurari_acces", e.getId_configurari_acces())
                        .addValue("cantitate_acces", e.getCantitate_acces())
                        .addValue("pret_acces", e.getPret_acces())
                        .addValue("discount_avans", e.getDiscount_avans())
                        .addValue("discount_student", e.getDiscount_student())
                        .addValue("cost_realizare_total", e.getCost_realizare_total())
                        .addValue("cost_unitar_tip_acces", e.getCost_unitar_tip_acces())
                        .addValue("data_inceput_vanzare", e.getData_inceput_vanzare())
                        .addValue("data_final_vanzare", e.getData_final_vanzare());

                int rows_affected_bautura = namedParameterJdbcTemplate.update(sql, parameters);

                if (rows_affected_bautura == 0) {
                    throw new Exception("Nu s-a putut adauga tipul de acces, verifica ca datele introduse sa fie corecte!");
                }
            }


            return new AddEvenimentRaspuns() {
                {
                    setSucces(true);
                    setMesaj("Evenimentul a fost adaugat cu succes!");
                    setId_eveniment(addEveniment.id_eveniment);
                }
            };
        } catch (Exception ex) {
            return new AddEvenimentRaspuns() {
                {
                    setSucces(false);
                    setMesaj("A aparut urmatoare eroare: " + ex.getMessage());
                    setId_eveniment(-1);
                }
            };
        }
    }

}
