package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.locatie.Locatie;
import com.firmaevenimente.firmaevenimente.models.sublocatie.SubLocatie;
import com.firmaevenimente.firmaevenimente.models.subtipeveniment.SubTipEveniment;
import com.firmaevenimente.firmaevenimente.models.tipacces.TipAcces;
import com.firmaevenimente.firmaevenimente.models.tipeveniment.TipEveniment;
import com.firmaevenimente.firmaevenimente.models.tiplocatie.TipLocatie;
import com.firmaevenimente.firmaevenimente.models.wizard.AddEveniment;
import com.firmaevenimente.firmaevenimente.models.wizard.AddEvenimentRaspuns;
import com.firmaevenimente.firmaevenimente.repositories.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/wizard")
public class WizardController {

    private WizardRepository wizardRepository;
    private TipEvenimentRepository tipEvenimentRepository;
    private SubTipEvenimentRepository subTipEvenimentRepository;
    private TipLocatieRepository tipLocatieRepository;
    private SubLocatieRepository subLocatieRepository;
    private LocatieRepository locatieRepository;
    private TipAccesRepository tipAccesRepository;

    public WizardController(WizardRepository wizardRepository,
                            TipEvenimentRepository tipEvenimentRepository,
                            SubTipEvenimentRepository subTipEvenimentRepository,
                            TipLocatieRepository tipLocatieRepository,
                            SubLocatieRepository subLocatieRepository,
                            LocatieRepository locatieRepository,
                            TipAccesRepository tipAccesRepository){
        this.wizardRepository = wizardRepository;
        this.tipEvenimentRepository = tipEvenimentRepository;
        this.subTipEvenimentRepository = subTipEvenimentRepository;
        this.tipLocatieRepository = tipLocatieRepository;
        this.subLocatieRepository = subLocatieRepository;
        this.locatieRepository = locatieRepository;
        this.tipAccesRepository = tipAccesRepository;
    }

    @GetMapping(path = "/checkdays")
    public boolean CheckIfDayAvailable(@RequestParam Date data_inceput, @RequestParam Date data_sfarsit){
        return this.wizardRepository.CheckIfDayAvailable(data_inceput, data_sfarsit);
    }

    @GetMapping(path = "/tip-evenimente")
    public List<TipEveniment> GetTipEvenimente(){
        return  this.tipEvenimentRepository.GetTipEveniment();
    }

    @GetMapping(path="/sub-tip-evenimente/{id_tip_eveniment}")
    public List<SubTipEveniment> GetSubTipEvenimente(@PathVariable int id_tip_eveniment){
        Map<String, List<String>> querryParam = new HashMap<>();
        querryParam.put("ID_TIP_EVENIMENT"
                , new ArrayList<String>() {
                    {
                        add(String.valueOf(id_tip_eveniment));
                    }
                });
        return  this.subTipEvenimentRepository.GetSubTipEvenimentWhere(querryParam);
    }

    @GetMapping(path="/tip-locatie/{id_tip_sub_locatie}")
    public List<TipLocatie> GetTipLocatie(@PathVariable int id_tip_sub_locatie){
        Map<String, List<String>> querryParam = new HashMap<>();
        querryParam.put("id_sub_eveniment"
                , new ArrayList<String>() {
                    {
                        add(String.valueOf(id_tip_sub_locatie));
                    }
                });
        return  this.tipLocatieRepository.GetTipLocatieWhere(querryParam);
    }

    @GetMapping(path="/sub-locatie/{id_tip_locatie}")
    public List<SubLocatie> GetSubLocatie(@PathVariable int id_tip_locatie){
        Map<String, List<String>> querryParam = new HashMap<>();
        querryParam.put("id_tip_locatie"
                , new ArrayList<String>() {
                    {
                        add(String.valueOf(id_tip_locatie));
                    }
                });
        return  this.subLocatieRepository.GetSubLocatieWhere(querryParam);
    }

    @GetMapping(path="/locatie/{id_sub_locatie}")
    public List<Locatie> GetLocatie(@PathVariable int id_sub_locatie){
        Map<String, List<String>> querryParam = new HashMap<>();
        querryParam.put("id_sub_locatie"
                , new ArrayList<String>() {
                    {
                        add(String.valueOf(id_sub_locatie));
                    }
                });
        return  this.locatieRepository.GetLocatieWhere(querryParam);
    }

    @GetMapping(path="/tip-acces/{id_sub_eveniment}")
    public List<TipAcces> GetTipAcces(@PathVariable int id_sub_eveniment){
        Map<String, List<String>> querryParam = new HashMap<>();
        querryParam.put("id_sub_eveniment"
                , new ArrayList<String>() {
                    {
                        add(String.valueOf(id_sub_eveniment));
                    }
                });
        return  this.tipAccesRepository.GetTipAccesWhere(querryParam);
    }

    @PostMapping(path="/add-eveniment")
    public AddEvenimentRaspuns AddEveniment(@RequestBody AddEveniment addEveniment)
    {
        return this.wizardRepository.AddEveniment(addEveniment);
    }
}
